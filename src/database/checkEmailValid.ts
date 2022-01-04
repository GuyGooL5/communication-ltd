import { DBResult, StoredProcedureInput, StoredProcedureOutput, storedProcedure } from "./DatabaseHandler";
import mssql from "mssql";


async function checkEmailValid(email: string):
    Promise<DBResult<undefined>> {
    const inputs: StoredProcedureInput[] = [
        ["email", mssql.NVarChar(50), email]
    ];
    const result = await storedProcedure("CheckEmailTaken", inputs);
    return { success: !result.returnValue, data: undefined };
}

export default checkEmailValid;