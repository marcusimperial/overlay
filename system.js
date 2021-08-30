async function clearCache(){
    const timeout = 10000; //ms
    for(let i=0; i<cache.length; i++){
        if(Date.now() >= cache[i].time + timeout) {
            console.log(`Cleared for ${cache[i].name}`)
            cache.splice(i, 1)
        }
    }
}

async function addPlayer(player){
    console.log('called');
    if(players.indexOf(player) === -1) {
        players.push(player);
        addPlayerToDisplay(player);
        checkBlacklisted(player);
        getBwstatsTag(player);
        const data = cache.find((obj) => obj.name === player);
        if(data) addStatsToDisplay(data);
        else {
            const data = ids.find((obj) => obj.name === player);
            if(data) getPlayer(data.id, "uuid");
            else getPlayer(player, "name")
        }
    }
}

async function deletePlayer(player){
    let index = players.indexOf(player);
    if(index !== -1){
        players.splice(index,1);
        document.getElementById(player).remove();
    }
}