var counter = 0;
var players = [];
let cache = [];
let ids = [];

const filepath = localStorage.getItem('path');
console.log(filepath);
console.log('listening STARTED');
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
            localStorage.setItem('key', key)
        }
    }
}