"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseHandler_1 = __importDefault(require("../database/DatabaseHandler"));
const payloads_1 = require("../utils/payloads");
const getClients = async (req, res) => {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.username))
        res.status(401).json(payloads_1.unautherized);
    const { username } = req.user;
    const dbResponse = await DatabaseHandler_1.default.getUserClients(username);
    if (!dbResponse.success)
        return res.status(400).json((0, payloads_1.jsonPayload)(false, "Failed to get user's clients."));
    return res.status(200).send((0, payloads_1.jsonPayload)(true, { clients: dbResponse.data }));
};
exports.default = getClients;
