"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseHandler_1 = require("./DatabaseHandler");
const mssql_1 = __importDefault(require("mssql"));
async function registerUser(email, username, hashedPassword) {
    const inputs = [
        ["username", mssql_1.default.NVarChar(50), username],
        ["password", mssql_1.default.NVarChar(100), hashedPassword],
        ["email", mssql_1.default.NVarChar(50), email]
    ];
    const outputs = [
        ["id", mssql_1.default.Int]
    ];
    const result = await (0, DatabaseHandler_1.storedProcedure)("RegisterUser", inputs, outputs);
    return {
        data: result.output.id,
        success: !!result.returnValue
    };
}
exports.default = registerUser;
