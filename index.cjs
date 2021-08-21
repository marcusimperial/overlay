const electron = require('electron');
const path = require('path');
const url = require('url');
const {app, BrowserWindow, Menu, ipcMain} = electron;

// SET ENV
process.env.NODE_ENV = 'development';



let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', () => {
  // Create new window
  const { width } = electron.screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width: 750,
    height: 700,
    transparent: true,
    x: width - 750,
    y: 23,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
  }
  });
  // Load html in window
  mainWindow.setAlwaysOnTop(true, 'floating');
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes:true
  }));

  mainWindow.on('closed', () => {
      app.quit();
  })

  const mainMenu = Menu.buildFromTemplate(mainmenutemplate);
  Menu.setApplicationMenu(mainMenu)
})

function createAddWindow(){
    addWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      },
      width: 300,
      height:200,
      title:'Add Shopping List Item'
    });
    addWindow.loadURL(url.format({
      pathname: path.join(__dirname, '/client/settings.html'),
      protocol: 'file:',
      slashes:true
    }));
    // Handle garbage collection
    addWindow.on('close', () => {
      addWindow = null;
    });
  }

ipcMain.on('ok', (e,item) => {
    console.log(item);
    createAddWindow();
  

})

const mainmenutemplate = [
    {
        label:'file',
        submenu :[
            {
                label: 'quit applciation',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            },
            {
                label:'testfunction',
                click(){
                    createAddWindow()
                }
            }
        ]
    }
];

if(process.platform == 'darwin'){
    mainmenutemplate.unshift({})
}

if(process.env.NODE_ENV !== 'production'){
    mainmenutemplate.push({
      label: 'Developer Tools',
      submenu:[
        {
          role: 'reload'
        },
        {
          label: 'Toggle DevTools',
          accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
          click(item, focusedWindow){
            focusedWindow.toggleDevTools();
          }
        }
      ]
    });
}
