const fs = require('fs');
const path = require('path');
const readLastLines = require('read-last-lines');
const https = require('https');

var counter = 0;
var players = [];
var savedplayers = [];
var saveddata = [];
var savedtime = [];
var checker = [];


setInterval(clearCache, 1000);


const clientpath = '/AppData/Roaming/.minecraft/logs/latest.log';
const path3 = path.relative("C://Users","..//..//");
const filepath = `C:/Users/${path3}/AppData/Roaming/.minecraft/logs/latest.log`;
console.log(filepath);
fs.open(filepath, 'r', () => {
    console.log('file opened!')
});
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
            let list = latest.split(" [CHAT] ONLINE: ")[1].split(", ");
            let lastindex = list[list.length-1];
            list[list.length-1] = lastindex.split('\r')[0].split("�")[0];
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

async function appendToDisplay(player, level){
    const table = document.getElementById('overlay');
    const row = table.insertRow(0)
    const cell = row.insertCell(0);
    const cell1 = row.insertCell(1);
    const cell2 = row.insertCell(2);
    cell1.innerHTML = level;
    cell2.innerHTML = player;
    cell.innerHTML = table.rows.length;
    row.id = player;
}

async function resetDisplay(){
    const table = document.getElementById('overlay');
    table.innerHTML = '';

}

async function clearCache(){
    const timeout = 210000; //ms
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
        const savedindex = savedplayers.indexOf(player);
        if(savedindex === -1){
            console.log(player);
            getPlayer(player);
        } else {
            getPlayerFromCache(savedindex);
        }
    } 
}

async function getPlayerFromCache(savedindex){
    const a = savedplayers[savedindex];
    const b = saveddata[savedindex];
    let c = checker[savedindex];

    players.push(a);
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
                    players.push(player);
                    savedplayers.push(player);
                    saveddata.push(level);
                    savedtime.push(Date.now());
                    checker.push(1);
                    console.log(`IGN: ${player} LEVEL: ${level}`);
                    appendToDisplay(player, level);
                    return parse.player.displayName
                 } else if(parse.success){
                    console.log(`${player} IS A NICK!`)
                    players.push(player);
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