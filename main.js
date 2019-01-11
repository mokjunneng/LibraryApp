const { app, BrowserWindow, globalShortcut } = require('electron');
const { autoUpdater } = require("electron-updater");
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

let win;

function createWindow() {
  const windowOptions = {
    width: 1080,
    minWidth: 680,
    height: 840,
  };
  win = new BrowserWindow(windowOptions);

  win.loadFile('index.html');

  win.webContents.openDevTools();

  globalShortcut.register('f5', () => {
    win.reload();
  });

  win.on('closed', () => {
    win = null
  })

  return win
};
function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('message', text);
}
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
});

app.on('ready', function() {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    globalShortcut.unregisterAll(win)
  }
});
app.on('ready', function()  {
  autoUpdater.checkForUpdatesAndNotify();
});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});
