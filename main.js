const {
  app,
  ipcMain
} = require('electron');
const window = require('./window');
const path = require('path');
const fs = require('fs');
const p2p = require('./util/p2pmodule');

const {
  PythonShell
} = require('python-shell');

app.on('ready', window.createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    window.createWindow();
  }
});

ipcMain.on('getFile', function (event, message) {
  // this is a file path
  console.log(message); 
  var options = {
    mode: 'text',
    // pythonOptions: ['-u'],
    scriptPath: path.join(__dirname, '/vaccine/engine/'),
    args: [message]
  };

  PythonShell.run('linvlib.py', options, function (err, results) {
    if (err) console.log(err);
    // this is a vaccine result
    console.log(results);
    window.createResultWindow(results);
    // event.sender.send('getResult', results);
  });
  // window.createResultWindow();
});

ipcMain.on('menu', function (event, message) {
  switch (message) {
    case 'search':
      window.createSearchWindow();
      break;
    default:
      break;
  }
});

ipcMain.on('sendP2P', function (event, message) {
  console.log(message);
  p2p.sendFile(message);
});