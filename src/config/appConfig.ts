import { readFileSync } from 'fs';
import { resolve } from 'path';
import env from './env';
import jwtConfig from './jwtConfig';
import mssqlConfig from './mssqlConfig';
import config_json from "./config.json";
import emailConfig from './emailConfig';

interface ConfigJSON {
    passwordStrength: validator.default.strongPasswordOptions;
    passwordHistory: number;
}

const configJSON: ConfigJSON = config_json;

const appConfig = {
    mssqlConfig,
    jwtConfig,
    emailConfig,
    sslPassphrase: env.PEM_KEYPHRASE,
    passwordStrengthConfig: configJSON.passwordStrength,
    passwordHistory: configJSON.passwordHistory
}


export default appConfig;