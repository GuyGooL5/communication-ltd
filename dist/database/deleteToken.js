"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseHandler_1 = require("./DatabaseHandler");
const mssql_1 = __importDefault(require("mssql"));
async function deleteToken(email) {
    const inputs = [
        ["email", mssql_1.default.NVarChar(50), email],
    ];
    const result = await (0, DatabaseHandler_1.storedProcedure)("DeleteToken", inputs);
    console.log(result);
    return { success: !!result.returnValue };
}
exports.default = deleteToken;
