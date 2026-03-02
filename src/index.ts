import express from "express";
import { Response, Request } from "express";
import { fileServerHits, hitsPrint, hitsReset, middlewareLogResponses } from "./middlewere.js";
const app = express();
const PORT = 8080;

app.use("/app",fileServerHits, express.static('./src/app'))

app.use(middlewareLogResponses);
app.use('/metrics', hitsPrint);
app.use('/reset', hitsReset);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
app.get('/healthz',readinessHandler);

function readinessHandler(req: Request, res: Response){

    res.set('Content-Type','text/plain; charset=utf-8');
    res.send('OK');

    //return await res;
    
}