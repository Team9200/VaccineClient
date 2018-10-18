const {
    BrowserWindow,
    Menu,
    Tray
} = require('electron');
const trayMenu = require('./menu/TrayMenu');
// const appMenu = require('./menu/menu');
const config = require('./config/config');
const path = require('path');
const url = require('url');

let win = null;
let child = null;
// let tray = null;

module.exports = {
    createWindow: () => {
        win = new BrowserWindow({
            width: 655,
            height: 460,
            resizable: false,
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
    },
    createSearchWindow: () => {
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
            pathname: path.join(__dirname, 'app/src/search.html'),
            protocol: 'file:',
            slashes: true
        }));

        child.on('closed', () => {
            child = null
        });
    },
    createChildWindow: () => {
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
}

// exports.createWindow = function createWindow() {
//     win = new BrowserWindow({
//         width: 655,
//         height: 460,
//         resizable: false,
//         frame: false
//     });
//     win.setMenu(null);

//     // Menu.setApplicationMenu(appMenu);

//     // win.webContents.openDevTools();

//     // tray = new Tray(config.resources.tray.icon);
//     // tray.setToolTip("LinearVaccine");
//     // tray.setContextMenu(trayMenu);

//     win.loadURL(url.format({
//         pathname: path.join(__dirname, 'app/src/index.html'),
//         protocol: 'file:',
//         slashes: true
//     }));

//     win.on('closed', () => {
//         win = null
//     });
// }

// exports.createSearchWindow = function createSearchWindow() {
//     child = new BrowserWindow({
//         parent: win,
//         width: 655,
//         height: 300,
//         resizable: false,
//         useContentSize: true,
//         frame: false
//     });
//     child.setMenu(null);

//     child.loadURL(url.format({
//         pathname: path.join(__dirname, 'app/src/search.html'),
//         protocol: 'file:',
//         slashes: true
//     }));

//     child.on('closed', () => {
//         child = null
//     });
// }

// exports.createChildWindow = function createChildWindow() {
//     child = new BrowserWindow({
//         parent: win,
//         width: 655,
//         height: 300,
//         resizable: false,
//         useContentSize: true,
//         frame: false
//     });
//     child.setMenu(null);

//     child.loadURL(url.format({
//         pathname: path.join(__dirname, 'app/src/result.html'),
//         protocol: 'file:',
//         slashes: true
//     }));

//     child.on('closed', () => {
//         child = null
//     });
// }