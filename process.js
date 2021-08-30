localStorage.setItem('key', '8ac664c4-42af-4c52-9938-c8d7c82dcf6c');

const fetch = require('node-fetch');
const {MongoClient} = require('mongodb');

async function getPlayer(input, type){
    console.log('called!!!');
    try {
        console.log(`${type}=${input}`);
        const key = localStorage.getItem('key');
        const req = await fetch(`https://api.hypixel.net/player?${type}=${input}&key=${key}`);
        const res = await req.json();
        console.log(res);
        if(!res) return;
        if(res.success && res.player !== null){
            const data = await compileStats(res.player);
            console.log(data);
            addStatsToDisplay(data);
            cache.push(data);
            const id = await compileProfile(player, res.player.uuid)
            ids.push(id)
        } else if(res.success){
            const data = { name:player, date:Date.now(), type:"nick" };
            addStatsToDisplay(data);
            cache.push(data);
            const id = await compileProfile(player);
            ids.push(id);
        } else if (!res.success &&
            res.cause === "Invalid API key") { //
        }
    } catch {
    } 
}

async function compileProfile(player, uuid){
    let data;
    if(uuid){
        data = {
            name:player,
            uuid:uuid,
            type:"real"
        }
    } else {
        data = {
            name:player,
            type:"nick"
        }
    }
    return data;
}

async function compileStats(data){
    const type = "real";
    const name = data.displayname;
    const date = Date.now();
    const session = ((((date - data.lastLogin))/1000)/60).toFixed(1);
    const star = data.achievements.bedwars_level;
    const kdr = (data.stats.Bedwars.kills_bedwars/
        data.stats.Bedwars.deaths_bedwars).toFixed(2);
    const fkills = data.stats.Bedwars.final_kills_bedwars;
    const fdeaths = data.stats.Bedwars.final_deaths_bedwars;
    const fkdr = (fkills/fdeaths).toFixed(2);
    const wins = data.stats.Bedwars.wins_bedwars;
    const losses = data.stats.Bedwars.losses_bedwars;
    const wlr = (wins/losses).toFixed(2);
    const bblr = (data.stats.Bedwars.beds_broken_bedwars/
        data.stats.Bedwars.beds_lost_bedwars).toFixed(2);
    const ws = data.stats.Bedwars.winstreak; 
    return {
        type:type,date:date, name:name, session:session, 
        star:star, ws:ws, kdr:kdr, fkills:fkills, 
        fdeaths:fdeaths, fkdr:fkdr, wins:wins, 
        losses:losses, wlr:wlr, bblr:bblr
    }
}

async function getBwstatsTag(player){
    try {
        const req = await fetch(`http://db.dfg87dcbvse44.xyz:8080/?playerv5=${player}`);
        const res = await req.text();
        const clean = res.toLowerCase().replace(/'/g,'"'); 
        const data = JSON.parse(clean);
        if(data.sniper) addTagToDisplay(player, "S");
    } catch {
    }
}

async function checkBlacklisted(player){
    const uri = 'mongodb+srv://overlaytestuser1:ohdare321@overlay.stfwe.mongodb.net/overlay?retryWrites=true&w=majority';
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const id = await getPlayerId(player);
        if(!id) return;
        const result = await client.db("overlay").collection("blacklist").findOne({
        UUID: id
        });
        if(result) showBlacklisted(player);
    } catch {
    } finally {
      await client.close();
    }
}

async function getPlayerId(player){
    try {
        const req = await fetch(`https://playerdb.co/api/player/minecraft/${player}`)
        const res = await req.json();
        if(res.success) return parse.data.player.raw_id;
    } catch {
    }
}

