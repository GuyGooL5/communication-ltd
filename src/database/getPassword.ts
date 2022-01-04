import { DBResult, StoredProcedureInput, StoredProcedureOutput, storedProcedure } from "./DatabaseHandler";
import mssql from "mssql";


interface PasswordResult {
    Password: string;
}

async function getPassword(username: string):
    Promise<DBResult<PasswordResult[]>> {
    const inputs: StoredProcedureInput[] = [
        ["username", mssql.NVarChar(50), username],
    ]
    const result = await storedProcedure("GetPassword", inputs);
    return {
        success: !!result.returnValue,
        data: result.recordset
    };
}

export default getPassword;