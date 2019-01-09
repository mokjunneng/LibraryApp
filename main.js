const { app, BrowserWindow, globalShortcut } = require('electron');

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

  globalShortcut.register('f5', () => {
    win.reload();
  });

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
    globalShortcut.unregisterAll(win)
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
