"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./env"));
const jwtConfig_1 = __importDefault(require("./jwtConfig"));
const mssqlConfig_1 = __importDefault(require("./mssqlConfig"));
const config_json_1 = __importDefault(require("./config.json"));
const emailConfig_1 = __importDefault(require("./emailConfig"));
const configJSON = config_json_1.default;
const appConfig = {
    mssqlConfig: mssqlConfig_1.default,
    jwtConfig: jwtConfig_1.default,
    emailConfig: emailConfig_1.default,
    sslPassphrase: env_1.default.PEM_KEYPHRASE,
    passwordStrengthConfig: configJSON.passwordStrength,
    passwordHistory: configJSON.passwordHistory
};
exports.default = appConfig;
