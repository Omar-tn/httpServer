import { envOrThrow } from "./api/errorHandler.js";
import { migrationConf } from './migrationConfig.js';
process.loadEnvFile();
export let apiConf = {
    api: {
        fileserverHits: 0,
        platform: envOrThrow(process.env.PLATFORM),
    },
    db: {
        dbURL: envOrThrow(process.env.DB_URL),
        migration: migrationConf,
    }
};
