"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseHandler_1 = require("./DatabaseHandler");
const mssql_1 = __importDefault(require("mssql"));
async function getToken(email) {
    const inputs = [
        ["email", mssql_1.default.NVarChar(50), email],
    ];
    const result = await (0, DatabaseHandler_1.storedProcedure)("GetToken", inputs);
    const { Token, Expiration } = result.recordset[0];
    return { success: !!result.returnValue, data: { Token, Expiration: new Date(Expiration) } };
}
exports.default = getToken;
