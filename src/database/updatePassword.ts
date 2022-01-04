import { DBResult, StoredProcedureInput, StoredProcedureOutput, storedProcedure } from "./DatabaseHandler";
import mssql from "mssql";


async function updatePassword(username: string, password: string):
    Promise<DBResult<undefined>> {

    const inputs: StoredProcedureInput[] = [
        ["username", mssql.NVarChar(50), username],
        ["password", mssql.NVarChar(100), password],
    ];
    const result = await storedProcedure("ChangePassword", inputs);
    return { success: !!result.returnValue, data: undefined }
}

export default updatePassword;