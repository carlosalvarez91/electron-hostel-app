const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const url = require('url');
const path = require('path');

//App on Ready
let win
app.on('ready', ()=>{
win = new BrowserWindow({width: 900, height: 700});
win.loadURL(url.format({
   pathname: path.join(__dirname, 'index.html'),
   protocol:'file:',
   slashes:true
 }));
 //Quit everything when main window closed
 win.on('closed', ()=>{
   app.quit();
 })

 //Build menu from menu template (see const template array at the bottom)
 const mainMenu = Menu.buildFromTemplate(template);
 Menu.setApplicationMenu(mainMenu);
});


// Create 'CheckIn' window
let addWindow;
function createAddWindowCheckIn(){
  addWindow = new BrowserWindow({
    width:300,
    height:600,
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

//date
const date = new Date().toUTCString();

//*** 2.Listen for data from check-in-renderer inputs when submit
ipcMain.on('check-in-input', (e,{name, surname, room, heads, nights, price, payment})=>{
  console.log({date, name, surname, room, heads, nights, price, payment});
//*** 3. Store this data  in a global variable
  global.checkInData = {date, name, surname, room, heads, nights, price, payment};
})

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
    {},//only for mac
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
    },
    {
      label: 'View',
      submenu: [
        {
          role: 'toggledevtools'
        },
        {
          label: 'Reload'
        }
      ]
    }
  ];