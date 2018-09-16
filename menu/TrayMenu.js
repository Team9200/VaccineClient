const {app, Menu, dialog} = require('electron');

let trayMenu = [
    {
        label: "열기"
    },
    {
        label: "악성코드 검사"
    },
    {
        label: "개발자 정보",
        click() { 
            dialog.showMessageBox({message: "BoB 7기 9200", buttons: ["확인"]}); 
        }
    }
];
var menu = Menu.buildFromTemplate(trayMenu);

module.exports = menu;