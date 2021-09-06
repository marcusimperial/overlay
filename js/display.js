setInterval(sortTable, 20);
async function sortTable() { //SORTING THE TABLE
    var table, rows, i, x, y;
    table = document.getElementById("overlay");
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 0; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = parseInt(rows[i].getElementsByTagName("TD")[1].innerHTML);
        y = parseInt(rows[i + 1].getElementsByTagName("TD")[1].innerHTML);
        // Check if the two rows should switch place:
        if (x > y) {
          // If so, mark as a switch and break the loop:
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        }
    }
}

async function addPlayerToDisplay(player){
    const table = document.getElementById('overlay');
    const row = table.insertRow(0);
    const c0 = row.insertCell(0); //player
    const c1 = row.insertCell(1); //star
    const c2 = row.insertCell(2); //tag
    const c3 = row.insertCell(3);
    const c4 = row.insertCell(4);
    const c5 = row.insertCell(5);
    const c6 = row.insertCell(6);
    const c7 = row.insertCell(7);
    const c8 = row.insertCell(8);
    const c9 = row.insertCell(9);
    const c10 = row.insertCell(10);
    const c11 = row.insertCell(11);
    const c12 = row.insertCell(12);

    row.id = player;
    c0.innerText = player;
    c0.id = `${player}-ign`;
    c1.id = `${player}-star`;
    c2.id = `${player}-tag`;
    c3.id = `${player}-ws`;
    c4.id = `${player}-ses`;
    c5.id = `${player}-fkdr`;
    c6.id = `${player}-kdr`;
    c7.id = `${player}-wlr`;
    c8.id = `${player}-bblr`;
    c9.id = `${player}-fks`;
    c10.id = `${player}-fds`;
    c11.id = `${player}-wins`;
    c12.id = `${player}-loss`;
}

async function addStatsToDisplay (data){ //ADDING PLAYER STATS
    if(data.type === "nick") {
        console.log('NICKKK DERECTED DISPLAYING');
        document.getElementById(`${data.name}-star`).innerText = "NICKED";
    } else {
        document.getElementById(`${data.name}-star`).innerText = data.star;
        document.getElementById(`${data.name}-ws`).innerText = data.ws;
        document.getElementById(`${data.name}-ses`).innerText = data.session;
        document.getElementById(`${data.name}-fkdr`).innerText = data.fkdr;
        document.getElementById(`${data.name}-kdr`).innerText = data.kdr;
        document.getElementById(`${data.name}-wlr`).innerText = data.wlr;
        document.getElementById(`${data.name}-bblr`).innerText = data.bblr;
        document.getElementById(`${data.name}-fks`).innerText = data.fkills;
        document.getElementById(`${data.name}-fds`).innerText = data.fdeaths;
        document.getElementById(`${data.name}-wins`).innerText = data.wins;
        document.getElementById(`${data.name}-loss`).innerText = data.losses;
    }
}

async function addTagToDisplay(player, tag){
    console.log(tag);
    const cell = document.getElementById(`${player}-tag`);
    console.log(cell.innerText);
    if(cell.innerText) {
        cell.innerText = `${cell.innerText}+${tag}`
    } else cell.innerText = tag;
}


async function resetDisplay(){
    const table = document.getElementById('overlay');
    table.innerHTML = '';

}

async function showBlacklisted(player){
    //MAKE ROW RED INSTEAD
    const cell0 = document.getElementById(`${player}-ign`); 
    cell0.style.color = 'red';
}