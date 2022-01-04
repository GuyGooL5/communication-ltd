
import { Request, Response } from "express";
import nodemailer from 'nodemailer';
import validator from 'validator';

import appConfig from "@app/config/appConfig";
import { internalServerError, jsonPayload } from "@app/utils/payloads";

import sgMail from "@sendgrid/mail"
import DatabaseHandler from "@app/database/DatabaseHandler";

sgMail.setApiKey(appConfig.emailConfig.sendGridApiKey)

const compose = (token: string, email: string) => ({
  to: email,
  from: appConfig.emailConfig.from,
  subject: "CommunicationsLTD - Password reset",
  html: `<p> Your one time password is: <strong>${token}</strong> . It is valid for only <strong>20 minutes</strong></p>`,
})


const TWENTY_MIN_UNIX = 1200000;

const generateExpiration = () => new Date(+new Date() + TWENTY_MIN_UNIX);


const postForgotPassword = async (req: Request, res: Response) => {

  try {

    const { email } = req.body;

    if (!validator.isEmail(email))
      return res.status(400).json(jsonPayload(false, "Email is invalid"));

    // TODO: ask database for the email.

    const doesEmailExist = true;

    if (!doesEmailExist)
      return res.status(400).json(jsonPayload(false, "The email is not registered"));

    const expiration = generateExpiration()

    const oneTimeTokenResult = await DatabaseHandler.generateToken(email, expiration);

    if (!oneTimeTokenResult.success)
      return res.status(400).json(jsonPayload(false, "Email is not registered"));

    const token = oneTimeTokenResult.data.Token;

    const emailSuccess = await sgMail.send(compose(token.toString(), email))
      .catch(() => false);


    if (!emailSuccess)
      return res.status(500).json(internalServerError);

    return res.status(200).json(jsonPayload(true, { expiration: expiration.toISOString() }));
  }
  catch (e) {
    console.log(e);
    res.status(500).json(internalServerError);
  }
}

export default postForgotPassword;