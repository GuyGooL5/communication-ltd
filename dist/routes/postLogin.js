"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseHandler_1 = __importDefault(require("../database/DatabaseHandler"));
const passwords_1 = require("../utils/passwords");
const jwt_1 = require("../utils/jwt");
const postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username)
            return res.status(400).json({ success: false, error: "Username is required" });
        if (!password)
            return res.status(400).json({ success: false, error: "Password is required" });
        const dbResponse = await DatabaseHandler_1.default.getPassword(username);
        if (!dbResponse.success)
            return res.status(401).json({ success: false, error: "Username or password invalid" });
        const savedHashedPassword = dbResponse.data[0].Password;
        const isPasswordOk = await (0, passwords_1.comparePasswords)(password, savedHashedPassword);
        if (!isPasswordOk)
            return res.status(401).json({ success: false, error: "Username or password invalid" });
        const token = (0, jwt_1.signJWT)(username);
        res.status(200).json({ success: true, data: { token } });
    }
    catch (e) {
        res.status(500).send({ success: false, error: "internal_server_error" });
    }
};
exports.default = postLogin;
