"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const passwords_1 = require("../utils/passwords");
const DatabaseHandler_1 = __importDefault(require("../database/DatabaseHandler"));
const jwt_1 = require("../utils/jwt");
const payloads_1 = require("../utils/payloads");
const validateEmail = (email) => validator_1.default.isEmail(email);
// uppercase,lowercase,digits 6-20 chars
const validateUsername = (username) => /^[a-zA-Z0-9]{6,20}$/g.test(username);
const postRegister = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!validateEmail(email))
            return res.status(400).json((0, payloads_1.jsonPayload)(false, "Invalid Email"));
        try {
            if (!(await DatabaseHandler_1.default.checkEmailValid(email)).success)
                return res.status(400).json((0, payloads_1.jsonPayload)(false, "Email is taken"));
        }
        catch (e) {
            return res.status(400).json((0, payloads_1.jsonPayload)(false, "Invalid Email "));
        }
        if (!validateUsername(username))
            return res.status(400).json((0, payloads_1.jsonPayload)(false, "Invalid Username"));
        if (!(await DatabaseHandler_1.default.checkUsernameValid(username)).success)
            return res.status(400).json((0, payloads_1.jsonPayload)(false, "Username is taken"));
        if (!(0, passwords_1.isPasswordStrong)(password))
            return res.status(400).json((0, payloads_1.jsonPayload)(false, "Password is not strong enough"));
        const hashedPassword = await (0, passwords_1.generateHash)(password);
        const dbResult = await DatabaseHandler_1.default.registerUser(email, username, hashedPassword);
        if (!dbResult.success)
            return res.status(500).json((0, payloads_1.jsonPayload)(false, "Failed to create user"));
        const token = (0, jwt_1.signJWT)(username);
        res.status(200).json((0, payloads_1.jsonPayload)(true, { token }));
    }
    catch (e) {
        res.status(500).json(payloads_1.internalServerError);
    }
};
exports.default = postRegister;
