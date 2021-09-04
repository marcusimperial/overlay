

ipcRenderer.send('app_version');
ipcRenderer.on('app_version', (event, arg) => {
  ipcRenderer.removeAllListeners('app_version');
  alert(arg.version);
  alert("HI THIS IS AN UPDATED VERSION");
});  

ipcRenderer.on('message', (event, text) => {
  var container = document.getElementById('messages');
  var message = document.createElement('div');
  message.innerHTML = text;
  container.appendChild(message);
});

ipcRenderer.on('update-downloaded', () => {
  alert('updated successfully downlaoded! restarting the application');
  ipcRenderer.send('restart-app');
});