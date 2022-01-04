"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const payloads_1 = require("../utils/payloads");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const DatabaseHandler_1 = __importDefault(require("../database/DatabaseHandler"));
mail_1.default.setApiKey(appConfig_1.default.emailConfig.sendGridApiKey);
const compose = (token, email) => ({
    to: email,
    from: appConfig_1.default.emailConfig.from,
    subject: "CommunicationsLTD - Password reset",
    html: `<p> Your one time password is: <strong>${token}</strong> . It is valid for only <strong>20 minutes</strong></p>`,
});
const TWENTY_MIN_UNIX = 1200000;
const generateExpiration = () => new Date(+new Date() + TWENTY_MIN_UNIX);
const postForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!validator_1.default.isEmail(email))
            return res.status(400).json((0, payloads_1.jsonPayload)(false, "Email is invalid"));
        // TODO: ask database for the email.
        const doesEmailExist = true;
        if (!doesEmailExist)
            return res.status(400).json((0, payloads_1.jsonPayload)(false, "The email is not registered"));
        const expiration = generateExpiration();
        const oneTimeTokenResult = await DatabaseHandler_1.default.generateToken(email, expiration);
        if (!oneTimeTokenResult.success)
            return res.status(400).json((0, payloads_1.jsonPayload)(false, "Email is not registered"));
        const token = oneTimeTokenResult.data.Token;
        const emailSuccess = await mail_1.default.send(compose(token.toString(), email))
            .catch(() => false);
        if (!emailSuccess)
            return res.status(500).json(payloads_1.internalServerError);
        return res.status(200).json((0, payloads_1.jsonPayload)(true, { expiration: expiration.toISOString() }));
    }
    catch (e) {
        console.log(e);
        res.status(500).json(payloads_1.internalServerError);
    }
};
exports.default = postForgotPassword;
