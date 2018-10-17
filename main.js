const {app, BrowserWindow, Menu, Tray, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
var fs = require('fs');
// const appMenu = require('./menu/menu');
const trayMenu = require('./menu/TrayMenu');
const config = require('./config/config');
const {PythonShell} = require('python-shell');

let win = null;
let child = null;
// let tray = null;

function createWindow () {
  win = new BrowserWindow({
      width: 655,
      height: 460, 
      resizable: false, 
      useContentSize: true,
      frame: false
  });
  win.setMenu(null);

  // Menu.setApplicationMenu(appMenu);

  // win.webContents.openDevTools();
  
  // tray = new Tray(config.resources.tray.icon);
  // tray.setToolTip("LinearVaccine");
  // tray.setContextMenu(trayMenu);

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app/src/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.on('closed', () => {
    win = null
  });
}

function createChildWindow () {
  child = new BrowserWindow({
      parent: win,
      width: 655,
      height: 300, 
      resizable: false, 
      useContentSize: true,
      frame: false
  });
  child.setMenu(null);

  child.loadURL(url.format({
    pathname: path.join(__dirname, 'app/src/result.html'),
    protocol: 'file:',
    slashes: true
  }));

  child.on('closed', () => {
    child = null
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on('getFile', function(event, message) {
  console.log(message);

  var options = {
    mode: 'text',
    // pythonOptions: ['-u'],
    scriptPath: path.join(__dirname, '/vaccine/engine/'),
    args: [message]
  };

  PythonShell.run('linvlib.py', options, function (err, results) {
    if (err) console.log(err);
    console.log(results);
    var result = results;
  })
  createChildWindow();
});