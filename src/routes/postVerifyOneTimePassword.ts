import appConfig from "@app/config/appConfig";
import DatabaseHandler from "@app/database/DatabaseHandler";
import { generateHash } from "@app/utils/passwords";
import { internalServerError, jsonPayload } from "@app/utils/payloads";
import { Request, Response } from "express";


const passwordGenerator = (length: number) => {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let password = "";
  for (let i = 0; i <= length; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
}


const postVerifyOneTimePassword = async (req: Request, res: Response) => {
  try {

    const { email, otp } = req.body;
    if (!otp)
      return res.status(400).json(jsonPayload(false, "One time code was not provided"));

    if (!email)
      return res.status(400).json(jsonPayload(false, "Error: User was not provided"));


    const getTokenReult = await DatabaseHandler.getToken(email);
    if (!getTokenReult.success)
      return res.status(500).json(internalServerError);
    const { Token, Expiration } = getTokenReult.data;

    if (new Date(Expiration) <= new Date())
      return res.status(401).json(jsonPayload(false, "The token has expired"));

    if (Token.toString() !== otp.toString())
      return res.status(401).json(jsonPayload(false, "The code is incorrect"));


    const newPassword = passwordGenerator(appConfig.passwordStrengthConfig.minLength);

    const hashedPassword = await generateHash(newPassword);


    const usernameResult = await DatabaseHandler.getUsername(email);
    if (!usernameResult.success)
      return res.status(500).json(internalServerError);


    const updatedPassword = await DatabaseHandler.updatePassword(usernameResult.data.Username, hashedPassword);

    if (!updatedPassword.success)
      return res.status(500).json(internalServerError);

    await DatabaseHandler.deleteToken(email);

    res.status(200).json(jsonPayload(true, { newPassword: newPassword }));
  } catch (e) {
    res.status(500).json(internalServerError);
  }

}
export default postVerifyOneTimePassword;