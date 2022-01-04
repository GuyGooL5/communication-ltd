"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPasswordStrong = exports.generateHash = exports.comparePasswords = void 0;
const appConfig_1 = __importDefault(require("../config/appConfig"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const isPasswordStrong = (password) => {
    return validator_1.default.isStrongPassword(password, appConfig_1.default.passwordStrengthConfig);
};
exports.isPasswordStrong = isPasswordStrong;
const ROUNDS = 10;
const generateHash = async (password) => {
    return bcrypt_1.default.hash(password, ROUNDS);
};
exports.generateHash = generateHash;
const comparePasswords = async (password, hash) => {
    return bcrypt_1.default.compare(`${password}`, `${hash}`);
};
exports.comparePasswords = comparePasswords;
