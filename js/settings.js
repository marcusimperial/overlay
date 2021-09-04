async function saveSettings(){
    console.log('called');
    const key = await verifyToken();
    const filepath = await verifyClient();
    console.log(key);
    console.log(filepath);
    if(key && filepath) console.log('set');
    else alert("ERROR: Key is bad or filepath does not exist.");
}

async function verifyToken(){
    try {
        const key = document.getElementById('key').value;
        console.log(key);
        const req = await fetch(`https://api.hypixel.net/key?key=${key}`);
        console.log(req);
        const res = await req.json();
        console.log(res);
        if(res.success) {
            localStorage.setItem('key', key);
            return true;
        } else return false;
    } catch {
        return false
    }
}

async function verifyClient(){
    try {
        const client = document.getElementById('client').value;
        let filepath = `C:/Users/${path.relative("C://Users","..//..//")}`;
        let vf = "/AppData/Roaming/.minecraft/logs/latest.log";
        let lc = "/.lunarclient/offline/files/1.8/logs/latest.log";
        if(client === "Vanilla/Forge Client") filepath += vf;
        else if(client ===  "Lunar Client") filepath += lc;
        else filepath += vf;
        console.log(filepath);
        const check = fs.openSync(filepath, 'r');
        if(check) {
            console.log('true!');
            localStorage.setItem('path', filepath);
            return true;
        } else return false;
    } catch {
        return false;
    }
}

console.log(app.getPath('home'));