async function createTable(){
    const div = document.getElementById('table');
    let table = document.createElement('table');
    div.appendChild(table);
    let thead = document.createElement('thead');
    table.appendChild(thead);
    let tbody = document.createElement('tbody');
    tbody.id="overlay";
    table.appendChild(tbody);
    
    let tr = document.createElement('tr');
    thead.appendChild(tr);
    
    let labels = [
        "Player", "Star", "Tag",
        "WS", "Session", "FKDR",
        "KDR", "WLR", "BBLR",
        "Fkills", "FDeaths",
        "Wins", "Losses"
    ];
    
    for(let i=0; i< labels.length; i++){
        let label = labels[i];
        let th = document.createElement('th');
        th.innerText = label;
        tr.appendChild(th);
    }
}

createTable();