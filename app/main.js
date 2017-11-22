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
    },
    {
      label: 'View',
      submenu: [
        {role: 'toggledevtools'}
      ]
    }
  ];