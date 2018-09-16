const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');
const appMenu = require('./menu.js');

let win

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600, resizable: false})
  Menu.setApplicationMenu(appMenu);
  
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'screen/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.on('closed', () => {
    win = null
  });
}

app.on('ready', createWindow)
  
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});