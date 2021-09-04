const electron = require('electron');
const {app, BrowserWindow , ipcMain} = electron;
const { autoUpdater } = require('electron-updater');
// SET ENV
let mainWindow;

function sendStatusToWindow(text) {
    mainWindow.webContents.send('message', text);
}

function createWindow() {
    const {width} = electron.screen.getPrimaryDisplay().workAreaSize;
    mainWindow = new BrowserWindow({
        width: 750,
        height:700,
        transparent: true,
        x: width - 750,
        y: 23,
        frame: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.setAlwaysOnTop(true, 'floating');
    mainWindow.setVisibleOnAllWorkspaces(true);
    mainWindow.loadFile('index.html');
    mainWindow.once('ready-to-show', () => {
        autoUpdater.checkForUpdatesAndNotify();
        console.log('UPDATE AVAILABLE')
      });
    mainWindow.on('closed', () => {
        app.quit();
    })
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});
  
app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
});
  
ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
});
autoUpdater.on('error', (err) => {
    mainWindow.webContents.send('error');
  })

autoUpdater.on('checking-for-update', () => {
    mainWindow.webContents.send('checking-for-update');
})

autoUpdater.on('update-available', () => {
    console.log('update available!');
    mainWindow.webContents.send('update-available');
});

autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update-downloaded');
});

ipcMain.on('restart-app', () => {
    autoUpdater.quitAndInstall();
});

autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    mainWindow.webContents.send('dw');
})
