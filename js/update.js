ipcRenderer.send('app_version');
ipcRenderer.on('app_version', (event, arg) => {
  ipcRenderer.removeAllListeners('app_version');
  alert(arg.version);
});  

ipcRenderer.on('update_available', () => {
  ipcRenderer.removeAllListeners('update_available');
  alert("A new update is available! Downloading now...")
});

ipcRenderer.on('update_downloaded', () => {
  ipcRenderer.removeAllListeners('update_downloaded');
  const con = confirm("Successfully downloaded. Restart the app?");
  if(con) ipcRenderer.send('restart_app');
  ipcRenderer.send('restart_app');
});

ipcRenderer.on('checking-for-update', () => {
  ipcRenderer.removeAllListeners('checking-for-update');
  alert('checking for update...');
})

ipcRenderer.on('update-not-available', () => {
  ipcRenderer.removeAllListeners('update-not-available');
  alert('this update is not available!');
})


