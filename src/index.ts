import express from "express";
import { Response, Request } from "express";
import { fileServerHits, hitsPrint, hitsReset, middlewareLogResponses } from "./api/middlewere.js";
import { chirpDeletionHandler, createChirpsHandler } from './api/chirp.js';
import { clearUsers, eventUserHandler, userChangeinfo } from './api/user.js';
import { errorHandler, InvalidTokenError } from "./api/errorHandler.js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { apiConf } from "./config.js";
import { accepteUser } from "./api/user.js";
import { createChirp } from "./db/queries/chirps.js";
import { chirpsHandler , getChirpHandler} from "./api/chirp.js";
import { loginHandler } from "./api/login.js";
import { refresh_tokens } from "./db/schema.js";
import { refreshTokenHandler, revokeHandler } from "./api/refresh_token.js";
const migrationClient = postgres(apiConf.db.dbURL, { max: 1 });
await migrate(drizzle(migrationClient), apiConf.db.migration);
const app = express();
const PORT = 8080;

app.use("/app",fileServerHits, express.static('./src/app'));
app.use(middlewareLogResponses);
app.use(express.json());




app.use('/admin/metrics', hitsPrint);  


app.post('/admin/reset', clearUsers);
//app.post('/api/validate_chirp');


app.get('/api/healthz', readinessHandler);
app.get('/api/chirps', chirpsHandler);//
app.get('/api/chirps/:chirpId',getChirpHandler);//


app.post('/api/users',accepteUser);//
app.post('/api/chirps',createChirpsHandler);//

app.post('/api/login',loginHandler);//

app.post('/api/refresh',refreshTokenHandler);//

app.post('/api/revoke',revokeHandler);//


app.post('/api/polka/webhooks',eventUserHandler);//

app.put('/api/users',userChangeinfo);//



app.delete('/api/chirps/:chirpId',chirpDeletionHandler)//

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


function readinessHandler(req: Request, res: Response){

    res.set('Content-Type','text/plain; charset=utf-8');
    res.send('OK');

    //return await res;
    
}