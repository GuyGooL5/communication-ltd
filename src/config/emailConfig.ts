import nodemailer, { SendMailOptions } from "nodemailer";
import env from "./env";

const emailConfig = {
  sendGridApiKey: env.SG_API_KEY,
  from: "communicationsltdhtd@gmail.com"
}

export default emailConfig;
