const {
  app,
  ipcMain
} = require('electron');
const window = require('./window');
const path = require('path');
const fs = require('fs');
const p2p = require('./util/p2pmodule');
require('date-utils');

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
  //utfPath = utf8.encode(message);
  //console.log(utfPath);
  var options = {
    mode: 'text',
    // pythonOptions: ['-u'],
    scriptPath: path.join(__dirname, '/vaccine/engine/'),
    args: [message]
  };

  PythonShell.run('linvlib.py', options, function (err, results) {
    if (err) console.log(err);
    // this is a vaccine result
    //sonRet = JSON.parse(results)
    //jsonRet.
    console.log(results);

    window.createResultWindow(results);
    event.sender.send(JSON.stringify(results));
    // event.sender.send('getResult', results);
  });
  /*
  var dt = new Date();
  var d = dt.toFormat('YYYY-MM-DD HH24:MI:SS');

  var data = '[SCAN]'+ d + 'start - ' + message +'\r\n';
  fs.appendFile('log.txt', data, (err) => {
    if(err) console.log(err);
    console.log("add write done");
  });
  */
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

ipcMain.on('quarantine', function (event, message) { //검역소창 띄우기
  const quarDir = './vaccine/engine/tmp';
  const quarList = [];
  fs.readdir(quarDir, (err, files) => {
    files.forEach(file => {
      console.log(file);
      quarList.push(file);
    });
    window.createQuarantineWindow(quarList);
  })
});

ipcMain.on('log', function (event, message) { //로그창 띄우기
  fs.readFile('log.txt', (err, data) => {
    console.log(data);
    window.createLogWindow(data);
  })
});

ipcMain.on('sendP2P', function (event, message) {
  window.createSendFileWindow();
});

const chunkSize = 16384;
var sliced_data = '';
var num = 0;
ipcMain.on('fileRequest', function(event, msg) {
    fs.readFile('./Malware.zip', function(err, data) {
        console.log(Buffer.from(data));
        var encoded_data = base64Encode(data);
        for(var i=0, j=0; i<encoded_data.length; i+=chunkSize, j++) {
            sliced_data = sliceEncodedData(encoded_data, i);
            event.sender.send('fileRequest-reply', 'advancedEicar', num, Buffer.from(data).length, sliced_data);
            num = num + 1;
        }
    });
});

function base64Encode(data) {
    return new Buffer.from(data);
 }; 

function sliceEncodedData(encoded_data, offset) {
    return encoded_data.slice(offset, offset+chunkSize);
};