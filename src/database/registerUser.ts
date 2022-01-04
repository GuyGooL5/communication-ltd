import { DBResult, StoredProcedureInput, StoredProcedureOutput, storedProcedure } from "./DatabaseHandler";
import mssql from "mssql";

async function registerUser(email: string, username: string, hashedPassword: string):
  Promise<DBResult<number>> {
  const inputs: StoredProcedureInput[] = [
    ["username", mssql.NVarChar(50), username],
    ["password", mssql.NVarChar(100), hashedPassword],
    ["email", mssql.NVarChar(50), email]
  ];
  const outputs: StoredProcedureOutput[] = [
    ["id", mssql.Int]
  ];
  const result = await storedProcedure("RegisterUser", inputs, outputs);
  return {
    data: result.output.id,
    success: !!result.returnValue
  }
}
export default registerUser;