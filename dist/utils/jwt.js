"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJWT = void 0;
const appConfig_1 = __importDefault(require("../config/appConfig"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const EXPIRE = "7d";
const signJWT = (username) => jsonwebtoken_1.default.sign({
    username,
    authenticated: true
}, appConfig_1.default.jwtConfig.key, { expiresIn: EXPIRE });
exports.signJWT = signJWT;
