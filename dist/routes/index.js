"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorizationMiddleware_1 = __importDefault(require("./authorizationMiddleware"));
const updatePassword_1 = __importDefault(require("./updatePassword"));
const postLogin_1 = __importDefault(require("./postLogin"));
const postRegister_1 = __importDefault(require("./postRegister"));
const getAuth_1 = __importDefault(require("./getAuth"));
const postClients_1 = __importDefault(require("./postClients"));
const getClients_1 = __importDefault(require("./getClients"));
const getPasswordStrength_1 = __importDefault(require("./getPasswordStrength"));
const postForgotPassword_1 = __importDefault(require("./postForgotPassword"));
const postVerifyOneTimePassword_1 = __importDefault(require("./postVerifyOneTimePassword"));
const router = express_1.default.Router();
router.get("/passwordStrength", getPasswordStrength_1.default);
router.post("/login", postLogin_1.default);
router.post("/register", postRegister_1.default);
router.post("/forgotPassword", postForgotPassword_1.default);
router.post("/verifyPassword", postVerifyOneTimePassword_1.default);
// Protected Routes.
router.post("/updatePassword", authorizationMiddleware_1.default, updatePassword_1.default);
router.post("/clients", authorizationMiddleware_1.default, postClients_1.default);
router.get("/clients", authorizationMiddleware_1.default, getClients_1.default);
router.get("/auth", authorizationMiddleware_1.default, getAuth_1.default);
exports.default = router;
