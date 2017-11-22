const {app, BrowserWindow, Menu, ipcMain, shell} = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');
const os = require('os');

//App on Ready
let win
app.on('ready', ()=>{
win = new BrowserWindow({width: 800, height: 600});
win.loadURL(url.format({
   pathname: path.join(__dirname, 'index.html'),
   protocol:'file:',
   slashes:true
 }));
 //Quit everything when main window closed
 win.on('closed', ()=>{
   app.quit();
 })

 //Build menu from menu template (see array line 38 'template')
 const mainMenu = Menu.buildFromTemplate(template);
 Menu.setApplicationMenu(mainMenu);
});


// Create 'CheckIn' window
let addWindow;
function createAddWindowCheckIn(){
  addWindow = new BrowserWindow({
    width:300,
    height:500,
    title: 'Check In'
  });
  addWindow.loadURL(url.format({
     pathname: path.join(__dirname, '/check-in/check-in.html'),
     protocol:'file:',
     slashes:true
   }));
   // Garbage collection
   addWindow.on('close',()=>{
     addWindow = null;
   })
}

// Print to PDF
//why in main.js? diference between main process and renderer process
//https://github.com/electron/electron/blob/master/docs/tutorial/quick-start.md
ipcMain.on('print-to-pdf', function(event){
  const pdfPath = path.join(os.tmpdir(), 'print.pdf');
  const win = BrowserWindow.fromWebContents(event.sender);

  win.webContents.printToPDF({}, function(error,data){
    if(error) return console.log(error.message);

    fs.writeFile(pdfPath, data, function(error){
      if(error)return console.log(err.message);
      shell.openExternal('file://' + pdfPath);
      event.sender.send('wrote-pdf', pdfPath);
    })
  })
});

//Create 'Help' window
function createAddWindowHelp(){
  addWindow = new BrowserWindow({
    width:300,
    height:500,
    title: 'Useful Numbers'
  });
  addWindow.loadURL(url.format({
     pathname: path.join(__dirname, 'help.html'),
     protocol:'file:',
     slashes:true
   }));
   // Garbage collection
   addWindow.on('close',()=>{
     addWindow = null;
   })
}

//Main menu template
  const template = [
    {},
    {
      label:'New',
      submenu:[
       { 
         label: 'Check In',
         click(){
           createAddWindowCheckIn();
         }
        },
       { label: 'Check Out'},
       { label: 'Refund'},
       { label: 'Total shift'},
       { label: 'Weekly Total'}
      ] 
    },
    {
      label:'Help',
      submenu:[
       { label: 'Useful Numbers',
          click(){
          createAddWindowHelp();
          }
        }
      ] 
    },
    {
     label: 'Window',
      submenu:[
        {
          label:'Quit',
          accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
          click(){
            app.quit();
          }
        }
      ]
    }
  ];