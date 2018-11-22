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
let quarantineWindow = null;
let logWindow = null;
// let tray = null;

module.exports = {
    createWindow: () => {
        mainWindow = new BrowserWindow({
            width: 645,
            height: 330,
            resizable: false,
            frame: false
        });
        mainWindow.setMenu(null);

        // Menu.setApplicationMenu(appMenu);

        //mainWindow.webContents.openDevTools();

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
            width: 660,
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
            height: 330,
            resizable: false,
            useContentSize: true,
            frame: false
        });
        resultWindow.setMenu(null);

        resultWindow.webContents.openDevTools();

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
    },
    createQuarantineWindow: (quarntineList) => {
        console.log("quarantineWindow Created");
        quarantineWindow = new BrowserWindow({
            parent: mainWindow,
            width: 655,
            height: 330,
            resizable: false,
            useContentSize: true,
            frame: false
        });
        quarantineWindow.setMenu(null);

        //quarantineWindow.webContents.openDevTools();

        quarantineWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'app/src/quarantine.html'),
            protocol: 'file:',
            slashes: true
        }));

        quarantineWindow.webContents.on('did-finish-load', () => {
            quarantineWindow.webContents.send('getQuarantineList', quarntineList);
        });

        quarantineWindow.on('closed', () => {
            quarantineWindow = null
        });
    },
    createLogWindow: (logList) => {
        console.log("log Created");
        logWindow = new BrowserWindow({
            parent: mainWindow,
            width: 655,
            height: 330,
            resizable: false,
            useContentSize: true,
            frame: false
        });
        logWindow.setMenu(null);

        // logWindow.webContents.openDevTools();

        logWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'app/src/log.html'),
            protocol: 'file:',
            slashes: true
        }));

        logWindow.webContents.on('did-finish-load', () => {
            logWindow.webContents.send('getLogList', logList);
        });

        logWindow.on('closed', () => {
            logWindow = null
        });
    },
    createSendFileWindow: () => {
        SendFileWindow = new BrowserWindow({
            parent: mainWindow,
            width: 400,
            height: 280,
            resizable: false,
            useContentSize: true,
            frame: false
        });
        SendFileWindow.setMenu(null);        
        SendFileWindow.loadURL(`file://${__dirname}/app/src/sendFile.html?senderId=test&receiverId=test2`);

        SendFileWindow.webContents.openDevTools();

        SendFileWindow.on('closed', () => {
            SendFileWindow = null
        });
    },
}