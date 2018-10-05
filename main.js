// boiletplate for starting a BrowserWindow process

const { app, BrowserWindow } = require('electron')
const db = require('./models/db')

let win

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

app.on('ready', createWindow)

app.on('window-all-close', () => {
  if (process.platform !== 'darwin') {
    // close the database connection
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });

    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
