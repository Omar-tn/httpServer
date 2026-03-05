import { MigrationConfig } from "drizzle-orm/migrator";
import { envOrThrow } from "./api/errorHandler.js";
import { migrationConf } from './migrationConfig.js';




process.loadEnvFile();


type APIConfig = {
    fileserverHits: number,
    platform: string
   
}

export let apiConf: {
    api: APIConfig,
    db: DBConfig
 } = {
    api:{
        fileserverHits: 0,
        platform: envOrThrow(process.env.PLATFORM!),
    },
    db:{

        dbURL: envOrThrow(process.env.DB_URL!),
        migration: migrationConf,
    }
}

export type DBConfig = {
    migration: MigrationConfig,
    dbURL: string
}
