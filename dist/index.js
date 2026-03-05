import express from "express";
import { fileServerHits, hitsPrint, middlewareLogResponses } from "./api/middlewere.js";
import { createChirpsHandler } from './api/chirp.js';
import { clearUsers } from './api/user.js';
import { errorHandler } from "./api/errorHandler.js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { apiConf } from "./config.js";
import { accepteUser } from "./api/user.js";
import { chirpsHandler, getChirpHandler } from "./api/chirp.js";
const migrationClient = postgres(apiConf.db.dbURL, { max: 1 });
await migrate(drizzle(migrationClient), apiConf.db.migration);
const app = express();
const PORT = 8080;
app.use("/app", fileServerHits, express.static('./src/app'));
app.use(middlewareLogResponses);
app.use(express.json());
app.use('/admin/metrics', hitsPrint);
app.post('/admin/reset', clearUsers);
//app.post('/api/validate_chirp');
app.get('/api/healthz', readinessHandler);
app.get('/api/chirps', chirpsHandler);
app.get('/api/chirps/:chirpId', getChirpHandler);
app.post('/api/users', accepteUser);
app.post('/api/chirps', async (req, res, next) => {
    try {
        createChirpsHandler(req, res);
    }
    catch (error) {
        next(error);
    }
});
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
function readinessHandler(req, res) {
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.send('OK');
    //return await res;
}
