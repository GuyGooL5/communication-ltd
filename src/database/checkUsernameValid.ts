import { DBResult, StoredProcedureInput, StoredProcedureOutput, storedProcedure } from "./DatabaseHandler";
import mssql from "mssql";


async function checkUsernameValid(useranme: string):
    Promise<DBResult<undefined>> {
    const inputs: StoredProcedureInput[] = [
        ["username", mssql.NVarChar(50), useranme]
    ];
    const result = await storedProcedure("CheckUsernameTaken", inputs);
    return { success: !result.returnValue, data: undefined };
}



export default checkUsernameValid;