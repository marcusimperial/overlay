async function getPlayer(name){

    const key = '851bad92-d981-497c-82f5-472fe4c3af32';

    const options = { 
        host: `https://api.hypixel.net/player?name=${name}&key=${key}`,
        method: 'GET',
        timeout: 3000
    };
    const path = `https://api.hypixel.net/player?name=${name}&key=${key}`;

    fetch(path)
    .then(req => req.json())
    .then((res) => {
        if(!res.success) {alert('This API Key is invalid')}
        else {console.log(res.success)};
    })
}

const fs = require('fs');

async function saveSettings(){
    const file = './settings.json';
    const rawdata = fs.readFileSync(file);
    const data = JSON.parse(rawdata);
    console.log(data);
    const client = document.getElementById('client');
    const key = document.getElementById('key');

    const datas = {
        client:client.value,
        key:key.value
    }
    fs.writeFileSync(file, JSON.stringify(datas));
    console.log('completed');

}