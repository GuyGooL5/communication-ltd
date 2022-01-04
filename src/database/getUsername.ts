import { DBResult, StoredProcedureInput, storedProcedure } from "./DatabaseHandler";
import mssql from "mssql";

interface GetUsernameResult {
  Username: string;
}

async function getEmail(email: string):
  Promise<DBResult<GetUsernameResult>> {
  const inputs: StoredProcedureInput[] = [
    ["email", mssql.NVarChar(50), email],
  ];
  const result = await storedProcedure("GetUsername", inputs);
  console.log(result);
  return { success: !!result.returnValue, data: result.recordset[0] };
}

export default getEmail;