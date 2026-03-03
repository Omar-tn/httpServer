import express from "express";
import { fileServerHits, hitsPrint, hitsReset, middlewareLogResponses, validateLength } from "./api/middlewere.js";
const app = express();
const PORT = 8080;
app.use("/app", fileServerHits, express.static('./src/app'));
app.use(middlewareLogResponses);
app.use(express.json());
app.get('/api/healthz', readinessHandler);
app.use('/admin/metrics', hitsPrint);
app.post('/admin/reset', hitsReset);
app.post('/api/validate_chirp', validateLength);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
function readinessHandler(req, res) {
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.send('OK');
    //return await res;
}
