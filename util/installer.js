var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: './dist/LinearVaccine-win32-x64',
  outputDirectory: './dist/installer',
  authors: 'Team 9200',
  exe: 'LinearVaccine.exe',
  description: 'This is Vaccine'
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));