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
        frame: false,
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
ipcMain.on('app-version', (event) => {
    event.sender.send('app-version', { version: app.getVersion() });
});

autoUpdater.on('update-not-available', () => {
    mainWindow.webContents.send('update-not-available');
});

autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update-available');
});
autoUpdater.on('download-progress', (obj) => {
    mainWindow.webContents.send('download-progress', obj.percent);
});
autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update-downloaded');
});
autoUpdater.on('error', () => {
    mainWindow.webContents.send('error');
})

ipcMain.on('restart', () => {
    autoUpdater.quitAndInstall();
});

