const {app, dialog, Menu} = require('electron');
const appName = app.getName();
let appMenu = [
    {
        label: "정보",
        submenu: [
            {
                label: "개발자",
                click() {
                    dialog.showMessageBox({message: "리니어선형", buttons: ["확인"]});
                }
            }
        ]
    }
];

if (process.platform === 'darwin') {
    appMenu.unshift({
		label: appName,
		submenu: [
			{
                label: "Quit",
				role: "quit"
			}
		]
	});
} else {
    appMenu.unshift({
		label: '파일',
		submenu: [
			{
				label: "종료",
				role: "quit"
			}
		]
	});
}

var menu = Menu.buildFromTemplate(appMenu);

module.exports = menu;
