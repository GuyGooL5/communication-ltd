"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseHandler_1 = require("./DatabaseHandler");
const mssql_1 = __importDefault(require("mssql"));
async function updatePassword(username, password) {
    const inputs = [
        ["username", mssql_1.default.NVarChar(50), username],
        ["password", mssql_1.default.NVarChar(100), password],
    ];
    const result = await (0, DatabaseHandler_1.storedProcedure)("ChangePassword", inputs);
    return { success: !!result.returnValue, data: undefined };
}
exports.default = updatePassword;
