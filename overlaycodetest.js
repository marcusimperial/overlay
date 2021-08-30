const fs = require('fs');
const path = require('path');
const readLastLines = require('read-last-lines');
const https = require('https');
const http = require('http');
const {MongoClient} = require('mongodb');

var counter = 0;
var players = [];
var savedplayers = [];
var saveddata = [];
var savedtime = [];
var savedids = [];
var checker = [];


setInterval(clearCache, 1000);
setInterval(sortTable, 20);


const clientpath = '/AppData/Roaming/.minecraft/logs/latest.log';
const path3 = path.relative("C://Users","..//..//");
const filepath = `C:/Users/${path3}/AppData/Roaming/.minecraft/logs/latest.log`;
fs.watchFile(filepath, {interval:0}, async () => {
    readLastLines.read(filepath, 10)
	.then((lines) => {
        const read = lines.split('\n');
        read.forEach(line => {analyzeLine(line)})
    });
});

async function analyzeLine(latest){
    if(!latest.includes('[Client thread/INFO]: [CHAT]')) return;
    else {
        //triggers for a player lookup 
        if(latest.includes(' has joined (')){
            let player = latest.split(' [CHAT] ')[1].split(' has joined (')[0];
            addPlayer(player);
        } else if(latest.includes(' has quit!')){
            let player = latest.split(' [CHAT] ')[1].split(' has quit!')[0];
            deletePlayer(player);
        } else if(latest.includes(' ONLINE: ')){
                let list = latest.split(" [CHAT] ONLINE: ")[1].split('\r')[0].split('\uFFFD')[0].split(", ");
                console.log(list);
                list.forEach(player => {addPlayer(player)})
        } else if(latest.includes('Sending you to mini')){
            counter = 0;
            players = [];
            resetDisplay();
            console.log('RESETING LIST-----------')
        } else if(latest.includes('joined the lobby!')){
            counter = 0;
            players = [];
            resetDisplay();
            console.log('RESETING LIST IN LOBBY-----------')
        } else if (latest.includes("Your new API key is ")) {
            let key = latest.split("[CHAT] Your new API key is ")[1].split('\r')[0];
            saveSettings(key);
        }
    }
}

function saveSettings(key){
    const file = './settings.json';
    const rawdata = fs.readFileSync(file);
    const data = JSON.parse(rawdata);
    console.log(data.client);
    const datas = {
        client:data.client,
        key:key
    }
    fs.writeFileSync(file, JSON.stringify(datas));
    console.log('settings updated');
}

async function sortTable() {
    var table, rows, i, x, y;
    table = document.getElementById("overlay");
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 0; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = parseInt(rows[i].getElementsByTagName("TD")[0].innerHTML);
        y = parseInt(rows[i + 1].getElementsByTagName("TD")[0].innerHTML);
        // Check if the two rows should switch place:
        if (x > y) {
          // If so, mark as a switch and break the loop:
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        }
    }
}

async function appendToDisplay(player, level){
    console.log(player);
    const table = document.getElementById('overlay');
    const row = document.getElementById(player);
    const cell0 = document.getElementById(`${player}-0`);
    const cell1 = document.getElementById(`${player}-1`);
    cell0.innerHTML = level;
    cell1.innerHTML = player;
}

async function addTagToDisplay(player, tag){
    const cell2 = document.getElementById(`${player}-2`);
    cell2.innerHTML = tag;
}

function addPlayerToDisplay(player){
    const table = document.getElementById('overlay');
    const row = table.insertRow(0);
    const cell0 = row.insertCell(0); //lvl
    const cell1 = row.insertCell(1); //player
    const cell2 = row.insertCell(2); //tag

    cell0.innerHTML = 'loading...';
    row.id = player;
    cell0.id = `${player}-0`;
    cell1.id = `${player}-1`;
    cell2.id = `${player}-2`;
}

async function resetDisplay(){
    const table = document.getElementById('overlay');
    table.innerHTML = '';

}

async function clearCache(){
    const timeout = 240000; //ms
    for(let i=0; i<savedplayers.length; i++){
        if(Date.now() >= savedtime[i] + timeout) {
            console.log(`Cleared for ${savedplayers[i]}`)
            savedplayers.splice(i, 1);
            saveddata.splice(i, 1);
            savedtime.splice(i, 1);
            checker.splice(i, 1);
        }
    }
}

function addPlayer(player){
    if(players.indexOf(player) === -1){
        players.push(player);
        getPlayerId(player);
        addPlayerToDisplay(player);
        getBwstatsTag(player);
        const savedindex = savedplayers.indexOf(player);
        if(savedindex === -1) {
            console.log(`getting player! ${player}`);
            getPlayer(player);
            
        } else {
            console.log('getting player!!')
            getPlayerFromCache(savedindex);
        }
    }
}

async function getPlayerFromCache(savedindex){
    const a = savedplayers[savedindex];
    console.log(a);

    const b = saveddata[savedindex];
    let c = checker[savedindex];
    checker[savedindex] = c++;
    if(checker[savedindex] >=3) {
        console.log(`IGN: ${a} LEVEL: ${b} THIS PLAYER IS FOLLOWING YOU`);
    }
    else console.log(`IGN: ${a} LEVEL: ${b}`);
    console.log(players.length);
    appendToDisplay(a, b);
}

function deletePlayer(player){
    let index = players.indexOf(player);
    if(index !== -1){
        players.splice(index,1);
        document.getElementById(player).remove();
    }
}

async function getPlayer(player){
    const rawdata = fs.readFileSync('settings.json');
    const data = JSON.parse(rawdata);
    const key = data["key"];

    const options = { 
        hostname: 'api.hypixel.net',
        path:`/player?name=${player}&key=${key}`,
        method: 'GET',
        timeout: 3000
    };
    const req = https.request(options, res => {
         let data = '';
         res.on('data', (chunk) => {
             data += chunk;
         });
         res.on('end', () => {
             if (data == "") return;
                else {
                 let parse = JSON.parse(data);
                 if(parse.success && parse.player !== null){
                    const level = parse.player.achievements.bedwars_level;
                    savedplayers.push(player);
                    saveddata.push(level);
                    savedtime.push(Date.now());
                    checker.push(1);
                    appendToDisplay(player, level);
                    return parse.player.displayName
                 } else if(parse.success){
                    savedplayers.push(player);
                    saveddata.push('nick');
                    savedtime.push(Date.now());
                    checker.push(1);
                    appendToDisplay(player, 'nick');

                } else {
              

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
                let tag;
                console.log(data);
                let clean = data.toLowerCase().replace(/'/g,'"');
                let parse = JSON.parse(clean);
                if(parse.sniper) tag = 'S';
                else tag = '';
                addTagToDisplay(player, tag);
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


async function checkFromDatabase(player, id){
    const uri = 'mongodb+srv://overlaytestuser1:ohdare321@overlay.stfwe.mongodb.net/overlay?retryWrites=true&w=majority';
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const result = await client.db("overlay").collection("blacklist").findOne({
        UUID: id});
        if(result) showBlacklisted(player);
        else return false;
    } catch {
      return false;
    } finally {
      await client.close();
    }
}

async function getPlayerId(player){
    const options = { 
        hostname: 'playerdb.co',
        path:`/api/player/minecraft/${player}`,
        method: 'GET',
        timeout: 3000
    };

    const req = https.request(options, res => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            if (data == "") return;
               else {
                let parse = JSON.parse(data);
                if(parse.success){
                   
                   const id = parse.data.player.raw_id;
                   console.log(id);
                   checkFromDatabase(player, id);
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

async function showBlacklisted(player){
    const cell0 = document.getElementById(`${player}-1`); 
    cell0.style.color = 'red';
}