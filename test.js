import http from 'http';
async function getBwstatsTag(player){
    const options = {
        host: 'db.dfg87dcbvse44.xyz',
        port: 8080,
        path: `/?playerv5=${player}`,
        method: 'GET',
        timeout: 3000
    }
    const req = http.request(options, res => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            if (data == "") return;
            else {
                let clean = data.toLowerCase().replace(/'/g,'"');
                let parse = JSON.parse(clean);
                console.log(parse.sniper)
            }
        });
    });
    req.on('error', () =>{
        return;
    });
    req.on('timeout', () => {
        return 'timeout'
    });
    req.end();
}

getBwstatsTag('aynobody');