"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseHandler_1 = __importDefault(require("../database/DatabaseHandler"));
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
const postClients = async (req, res) => {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.username))
        res.status(401).json(payloads_1.unautherized);
    const { username } = req.user;
    const { fullname, dob, email, phoneNumber, address, } = req.body;
    if (!(fullname && dob && email && phoneNumber && address))
        return res
            .status(400)
            .json((0, payloads_1.jsonPayload)(false, "Missing fields in request"));
    const dbResponse = await DatabaseHandler_1.default.registerClient(username, req.body);
    if (!dbResponse.success)
        return res.status(400).json((0, payloads_1.jsonPayload)(false, "Failed to create client"));
    return res.status(200).send((0, payloads_1.jsonPayload)(true, dbResponse.data));
};
exports.default = postClients;
