import { apiConf } from './config.js';
import { respondWithJSON } from './json.js';
import { ExceedLimitError } from './errorHandler.js';
//export type middmiddlewereLogResponseslewere = (req : Request, res: Response, next: NextFunction) => void;
export function middlewareLogResponses(req, res, next) {
    res.on('finish', () => {
        const stat = res.statusCode;
        if (stat < 200 || stat >= 300) {
            console.log('[NON-OK]', req.method, req.url, '- Status:', stat);
        }
    });
    next();
}
export function fileServerHits(req, res, next) {
    apiConf.fileserverHits++;
    next();
}
export function hitsPrint(req, res, next) {
    res.contentType('text/html;charset=utf-8');
    res.send(`<h1>Welcome, Chirpy Admin</h1>
          <p>Chirpy has been visited ${apiConf.fileserverHits} times!</p>`);
    next();
}
export function hitsReset(req, res, next) {
    apiConf.fileserverHits = 0;
    res.send();
    next();
}
export function validateLength(req, res) {
    //let body = "";
    let msg = req.body.body;
    res.contentType('application/json');
    if (msg.length > 140) {
        throw new ExceedLimitError('Chirp is too long. Max length is 140');
    }
    // else
    let tmp = msg.toLocaleLowerCase();
    let split = msg.split(' ');
    let profines = [/kerfuffle/i, /sharbert/i, /fornax/i];
    profines.forEach((e) => {
        for (let i = 0; i < split.length; i++) {
            if (split[i].toLocaleLowerCase().match(e))
                split[i] = '****';
        }
    });
    let result = split.join(" ");
    respondWithJSON(res, 200, {
        "cleanedBody": result
    });
    /*  req.on('data',(c)=>{
         body +=c;
     });
 
     req.on('end',()=>{
         let b = req.body;
    
         try {
             b = JSON.parse(body);
         } catch (error) {
             
             res.status(404).send(`{
                 "error": "somthing went wrong"
                 }`);
         }
 
         
  }); */
}
