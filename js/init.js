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

async function createSettings() {
    const div = document.getElementById('settings');
    let input = document.createElement('input');
    input.type = "text";
    input.id = "key";
    input.placeholder = "Input API Key";
    input.style = "-webkit-app-region: no-drag";
    div.appendChild(input);

    let select = document.createElement('select');
    select.id = "client";
    select.style = "-webkit-app-region: no-drag";
    div.appendChild(select);
    const options = ["Vanilla/Forge Client", "Lunar Client"];
    options.forEach(option => {
        let element = document.createElement('option');
        element.innerText = option;
        select.appendChild(element);
    })

    let button = document.createElement('input');
    button.type = "button";
    button.id = "save";
    button.value = "Save";
    button.style = "-webkit-app-region: no-drag";
    div.appendChild(button);
}

async function callLoader() {
    document.getElementById('settings').remove();
    document.getElementById('table').remove();

    let div = document.createElement('div');
    div.id = 'loaderdiv';
    document.body.appendChild(div);

    let div2 = document.createElement('div');
    div2.className = 'loader';
    div.appendChild(div2);

    let header = document.createElement('label');
    header.className = 'update-label';
    const alt = ['','.','..','...'];
    let counter = 0;
    let initial = 'Downloading Update';
    header.innerText = initial;
    setInterval(() => {
        let text = initial;
        text += alt[counter];
        header.innerText = text;
        counter++;
        if(counter >= alt.length) counter = 0;
    }, 500);
    div.appendChild(header)

    let info = document.createElement('label');
    info.className = "update-label";
    info.id = "info";
    div.appendChild(info);
}

createSettings();
createTable();