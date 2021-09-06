ipcRenderer.send('app-version');

ipcRenderer.on('app-version', (event, arg) => {
  ipcRenderer.removeAllListeners('app-version');
  document.getElementById('version').innerText = arg.version;
}); 

ipcRenderer.on('update-available', () => {
  ipcRenderer.removeAllListeners('update-available');
  callLoader();
});

ipcRenderer.on('download-progress', (event, percent) => {
  displayStatus(`${percent.toFixed(2) || 0}%`);
});

ipcRenderer.on('update-downloaded', () => {
  ipcRenderer.removeAllListeners('update-downloaded');
  displayStatus("Download Complete! Restarting Application...")
  ipcRenderer.send('restart');
});

ipcRenderer.on('error', () => {
  ipcRenderer.removeAllListeners('error');
  displayStatus("An Error Occured! Relaunching Application...")
  ipcRenderer.send('restart');
});

async function displayStatus(status) {
  const label = document.getElementById('info');
  label.innerText = status;
}