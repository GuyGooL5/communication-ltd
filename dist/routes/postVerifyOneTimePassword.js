"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig_1 = __importDefault(require("../config/appConfig"));
const DatabaseHandler_1 = __importDefault(require("../database/DatabaseHandler"));
const passwords_1 = require("../utils/passwords");
const payloads_1 = require("../utils/payloads");
const passwordGenerator = (length) => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    for (let i = 0; i <= length; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
};
const postVerifyOneTimePassword = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!otp)
            return res.status(400).json((0, payloads_1.jsonPayload)(false, "One time code was not provided"));
        if (!email)
            return res.status(400).json((0, payloads_1.jsonPayload)(false, "Error: User was not provided"));
        const getTokenReult = await DatabaseHandler_1.default.getToken(email);
        if (!getTokenReult.success)
            return res.status(500).json(payloads_1.internalServerError);
        const { Token, Expiration } = getTokenReult.data;
        if (new Date(Expiration) <= new Date())
            return res.status(401).json((0, payloads_1.jsonPayload)(false, "The token has expired"));
        if (Token.toString() !== otp.toString())
            return res.status(401).json((0, payloads_1.jsonPayload)(false, "The code is incorrect"));
        const newPassword = passwordGenerator(appConfig_1.default.passwordStrengthConfig.minLength);
        const hashedPassword = await (0, passwords_1.generateHash)(newPassword);
        const usernameResult = await DatabaseHandler_1.default.getUsername(email);
        if (!usernameResult.success)
            return res.status(500).json(payloads_1.internalServerError);
        const updatedPassword = await DatabaseHandler_1.default.updatePassword(usernameResult.data.Username, hashedPassword);
        if (!updatedPassword.success)
            return res.status(500).json(payloads_1.internalServerError);
        await DatabaseHandler_1.default.deleteToken(email);
        res.status(200).json((0, payloads_1.jsonPayload)(true, { newPassword: newPassword }));
    }
    catch (e) {
        res.status(500).json(payloads_1.internalServerError);
    }
};
exports.default = postVerifyOneTimePassword;
