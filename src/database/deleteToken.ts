import { DBResult, StoredProcedureInput, storedProcedure } from "./DatabaseHandler";
import mssql from "mssql";


async function deleteToken(email: string):
  Promise<DBResult<undefined>> {
  const inputs: StoredProcedureInput[] = [
    ["email", mssql.NVarChar(50), email],
  ];
  const result = await storedProcedure("DeleteToken", inputs);
  console.log(result);
  return { success: !!result.returnValue };
}

export default deleteToken;