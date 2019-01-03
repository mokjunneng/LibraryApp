// boiletplate for starting a BrowserWindow process

const electron = require('electron');
app = electron.app;
BrowserWindow = electron.BrowserWindow;

let win;

function createWindow() {
  const windowOptions = {
    width: 1080,
    minWidth: 680,
    height: 840,
  }

  win = new BrowserWindow(windowOptions)

  win.loadFile('index.html')

  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', function() {
  createWindow();
})

app.on('window-all-close', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
