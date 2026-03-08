import { envOrThrow } from "./api/errorHandler.js";
import { migrationConf } from './migrationConfig.js';
process.loadEnvFile();
export let apiConf = {
    api: {
        fileserverHits: 0,
        platform: envOrThrow(process.env.PLATFORM),
        secret: envOrThrow(process.env.SECRET),
        polka: envOrThrow(process.env.POLKA_KEY)
    },
    db: {
        dbURL: envOrThrow(process.env.DB_URL),
        migration: migrationConf,
    }
};
