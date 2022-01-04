"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./env"));
const emailConfig = {
    sendGridApiKey: env_1.default.SG_API_KEY,
    from: "communicationsltdhtd@gmail.com"
};
exports.default = emailConfig;
