const {app, dialog, Menu} = require('electron');
const appName = app.getName();
let appMenu = [
    {
        label: "Info",
        submenu: [
            {
                label: "Developer",
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
                label:'Quit',
				role: 'quit'
			}
		]
	});
} else {
    appMenu.unshift({
		label: 'File',
		submenu: [
			{
				label:'Quit',
				role: 'quit'
			}
		]
	});
}

var menu = Menu.buildFromTemplate(appMenu);

module.exports = menu;
