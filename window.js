const {
    BrowserWindow,
    Menu,
    Tray
} = require('electron');
const trayMenu = require('./menu/TrayMenu');
// const appMenu = require('./menu/menu');
// const config = require('./config/config');
const path = require('path');
const url = require('url');
const info = require('./config/windowInfo');

let mainWindow = null;
let searchWindow = null;
let resultWindow = null;
// let tray = null;

module.exports = {
    createWindow: () => {
        mainWindow = new BrowserWindow({
            width: 655,
            height: 460,
            resizable: false,
            frame: false
        });
        mainWindow.setMenu(null);

        // Menu.setApplicationMenu(appMenu);

        // mainWindow.webContents.openDevTools();

        // tray = new Tray(config.resources.tray.icon);
        // tray.setToolTip("LinearVaccine");
        // tray.setContextMenu(trayMenu);

        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'app/src/index.html'),
            protocol: 'file:',
            slashes: true
        }));

        mainWindow.on('closed', () => {
            mainWindow = null
        });
    },
    createSearchWindow: () => {
        searchWindow = new BrowserWindow({
            parent: mainWindow,
            width: 655,
            height: 330,
            resizable: false,
            useContentSize: true,
            frame: false
        });
        searchWindow.setMenu(null);
        
        searchWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'app/src/search.html'),
            protocol: 'file:',
            slashes: true
        }));

        searchWindow.on('closed', () => {
            searchWindow = null
        });
    },
    createResultWindow: (results) => {
        resultWindow = new BrowserWindow({
            parent: searchWindow,
            width: 655,
            height: 300,
            resizable: false,
            useContentSize: true,
            frame: false
        });
        resultWindow.setMenu(null);
        resultWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'app/src/result.html'),
            protocol: 'file:',
            slashes: true
        }));

        resultWindow.webContents.on('did-finish-load', () => {
            resultWindow.webContents.send('getResult', results);
        });

        resultWindow.on('closed', () => {
            resultWindow = null
        });
    }
}