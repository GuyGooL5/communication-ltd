"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig_1 = __importDefault(require("../config/appConfig"));
const payloads_1 = require("../utils/payloads");
const getPasswordStrength = (req, res) => {
    res.status(200).json((0, payloads_1.jsonPayload)(true, { strength: appConfig_1.default.passwordStrengthConfig }));
};
exports.default = getPasswordStrength;
