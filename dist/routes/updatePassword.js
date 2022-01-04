"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig_1 = __importDefault(require("../config/appConfig"));
const DatabaseHandler_1 = __importDefault(require("../database/DatabaseHandler"));
const jwt_1 = require("../utils/jwt");
const passwords_1 = require("../utils/passwords");
const payloads_1 = require("../utils/payloads");
const isNewPasswordUnique = async (oldPasswordHashes, newPassword) => {
    for (const oldPasswordHash of oldPasswordHashes) {
        const match = await (0, passwords_1.comparePasswords)(newPassword, oldPasswordHash);
        if (match)
            return false;
    }
    return true;
};
const updatePassword = async (req, res) => {
    if (!req.user || !req.user.username)
        res.status(401).json(payloads_1.unautherized);
    const { username } = req.user;
    const { oldPassword, newPassword, newPasswordRepeat } = req.body;
    if (!oldPassword)
        return res
            .status(400)
            .json((0, payloads_1.jsonPayload)(false, "Old Password is required"));
    if (!newPassword)
        return res
            .status(400)
            .json((0, payloads_1.jsonPayload)(false, "New Password is required"));
    if (!newPasswordRepeat)
        return res
            .status(400)
            .json((0, payloads_1.jsonPayload)(false, "New Password Repeat is required"));
    if (newPassword !== newPasswordRepeat)
        return res
            .status(400)
            .json((0, payloads_1.jsonPayload)(false, "Passwords don't match"));
    if (!(0, passwords_1.isPasswordStrong)(newPassword))
        return res
            .status(400)
            .json((0, payloads_1.jsonPayload)(false, "New Password is not strong enough"));
    const dbResponseGetPasswords = await DatabaseHandler_1.default.getPassword(username);
    if (!dbResponseGetPasswords.success)
        return res.status(500).json((0, payloads_1.jsonPayload)(false, "Couldn't not resolve username"));
    const currentPasswords = dbResponseGetPasswords.data;
    const isOldPasswordOk = await (0, passwords_1.comparePasswords)(oldPassword, currentPasswords[0].Password);
    if (!isOldPasswordOk)
        return res.status(400).json((0, payloads_1.jsonPayload)(false, "Old Password is incorrect"));
    const oldPasswordsToCompare = currentPasswords.splice(0, appConfig_1.default.passwordHistory).map(v => v.Password);
    const isNewPasswordUniqueResult = await isNewPasswordUnique(oldPasswordsToCompare, newPassword);
    if (!isNewPasswordUniqueResult)
        return res.status(400)
            .json((0, payloads_1.jsonPayload)(false, `Your new password is the same as one of your last ${appConfig_1.default.passwordHistory} passwords`));
    const hashedNewPassword = await (0, passwords_1.generateHash)(newPassword);
    const dbResponseUpdatePassword = await DatabaseHandler_1.default.updatePassword(username, hashedNewPassword);
    if (!dbResponseUpdatePassword.success)
        return res.status(500).json((0, payloads_1.jsonPayload)(false, "Couldn't not resolve username"));
    const token = (0, jwt_1.signJWT)(username);
    return res.status(200).send((0, payloads_1.jsonPayload)(true, { token }));
};
exports.default = updatePassword;
