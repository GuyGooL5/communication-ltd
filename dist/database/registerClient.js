"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseHandler_1 = require("./DatabaseHandler");
const mssql_1 = __importDefault(require("mssql"));
async function registerClient(username, data) {
    const { fullname, address, dob, email, phoneNumber } = data;
    const inputs = [
        ["username", mssql_1.default.NVarChar(50), username],
        ["fullname", mssql_1.default.NVarChar(50), fullname],
        ["dateofbirth", mssql_1.default.Date(), dob],
        ["email", mssql_1.default.NVarChar(50), email],
        ["phonenumber", mssql_1.default.NVarChar(50), phoneNumber],
        ["address", mssql_1.default.NVarChar(50), address]
    ];
    const outputs = [
        ["id", mssql_1.default.Int]
    ];
    const result = await (0, DatabaseHandler_1.storedProcedure)("RegisterClient", inputs, outputs);
    return {
        success: !!result.returnValue,
        data: result.output.id
    };
}
exports.default = registerClient;
