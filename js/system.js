async function clearCaches(){
    const timeout = 10000; //ms
    for(let i=0; i<cache.length; i++){
        if(Date.now() >= cache[i].date + timeout) {
            cache.splice(i, 1)
        }
    }
}

async function addPlayer(player){
    if(players.indexOf(player) === -1) {
        players.push(player);
        addPlayerToDisplay(player);
        checkBlacklisted(player);
        getBwstatsTag(player);
        const data = cache.find((obj) => obj.name === player);
        if(data) addStatsToDisplay(data);
        else {
            const data = ids.find((obj) => obj.name === player);
            console.log(data);
            if(data && data.type === "real") getPlayer(data.uuid, "uuid");
            else if(data && data.type === "nick") addTagToDisplay(player, "N");
            else getPlayer(player, "name");
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