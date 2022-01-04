"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payloads_1 = require("../utils/payloads");
const getAuth = async (req, res) => {
    const user = req.user;
    if (!user)
        res.status(401).json(payloads_1.unautherized);
    res.status(200).json((0, payloads_1.jsonPayload)(true, user));
};
exports.default = getAuth;
