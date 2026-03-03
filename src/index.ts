import express from "express";
import { Response, Request } from "express";
import { fileServerHits, hitsPrint, hitsReset, middlewareLogResponses } from "./api/middlewere.js";
const app = express();
const PORT = 8080;

app.use("/app",fileServerHits, express.static('./src/app'))
app.get('/api/healthz',readinessHandler);

app.use(middlewareLogResponses);

app.use('/admin/reset', hitsReset);

app.use('/admin/metrics', hitsPrint);  

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


function readinessHandler(req: Request, res: Response){

    res.set('Content-Type','text/plain; charset=utf-8');
    res.send('OK');

    //return await res;
    
}