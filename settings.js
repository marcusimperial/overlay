const fs = require('fs');

function checksettings(){
    const electron = require('electron');
    const {ipcRenderer} = electron;

    const fs = require('fs');
    fs.open()
    let rawdata = fs.readFileSync('settings.json');
    let data = JSON.parse(rawdata);
    let settings = data["settings"];

    if(settings == ""){
        ipcRenderer.send('nosettings')
    } else {
        validatesettings(data["settings"]["apikey"], data["settings"]["client"])
    }
}

function verifySettings(key, client){
    const https = require('fs');

    import fs from 'fs';
    fs.fstatSync
    
    var ok = fetch(`https://api.hypixel.net/key?key=${key}`).then(res => res.json());
        console.log(ok);
}
validatesettings('3ee4ea82-d2a4-43bc-bbf1-8b62cfdb7e14');


async function verifyToken(key) {
    try {
        const check = await fetch(`https://api.hypixel.net/key?key=${key}`);
        document.getElementById('key').remove()
        if(check) {
            localStorage.setItem('key', key);
            const {ipcRenderer} = require('electron');
            ipcRenderer.send('set')

        } else {
            alert('')
        }alert('')
    } catch {

    }

}

async function test(){
    const client = document.getElementById('client');
    let path;
    switch(client){
        case "Vanilla/Forge Client":
            path = 
        default:

    }
}