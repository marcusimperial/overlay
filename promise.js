import util from 'util';
import https from 'https';
import fs from 'fs';


async function getPlayer(name){

    const rawdata = fs.readFileSync('settings.json');
    const data = JSON.parse(rawdata);
    const key = data["key"];

    const options = { 
        hostname: 'api.hypixel.net',
        path:`/player?name=${name}&key=${key}`,
        method: 'GET',
        timeout: 3000
    };
    const req = https.request(options, res => {
         let data = '';
         res.on('data', (chunk) => {
             data += chunk;
         });
         res.on('end', () => {
             if (data == "") {
                return ""
             } else {
                 let parse = JSON.parse(data);
                 if(parse.success){
                     console.log(parse.player.playername)
                    return parse.player.displayName
                 } else {
                     console.log(parse.cause);
                    return parse.cause
                 }
             }
         });
     });
    req.on('error', () =>{
        return parse.cause
    });
    req.on('timeout', () => {
        return 'timeout'
    });
    req.end();
}

getPlayer('dezskitten')