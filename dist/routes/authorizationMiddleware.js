"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const payloads_1 = require("../utils/payloads");
const appConfig_1 = __importDefault(require("../config/appConfig"));
const authorizationMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization)
            throw new Error();
        const [Bearer, token] = authorization.split(" ");
        const isJWTOk = jsonwebtoken_1.default.verify(token, appConfig_1.default.jwtConfig.key);
        if (!token && !isJWTOk)
            throw new Error();
        const decoded = jsonwebtoken_1.default.decode(token, { json: true });
        req.user = {
            username: decoded.username,
            authenticated: decoded.authenticated
        };
        next();
        // res.status(200).json(jsonPayload(true, decoded));
    }
    catch (e) {
        console.log(e);
        res.status(401).json((0, payloads_1.jsonPayload)(false, "Unautherized"));
    }
};
exports.default = authorizationMiddleware;
