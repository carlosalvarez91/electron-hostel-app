const {app, BrowserWindow, Menu} = require('electron');
const url = require('url');
const path = require('path');

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

 // build menu from menu template (see array line 38 'template')
 const mainMenu = Menu.buildFromTemplate(template);
 Menu.setApplicationMenu(mainMenu);
});


// Handle createAddWindow
let addWindow;
function createAddWindow(){
  addWindow = new BrowserWindow({
    width:300,
    height:500,
    title: 'Check In'
  });
  addWindow.loadURL(url.format({
     pathname: path.join(__dirname, 'receipt.html'),
     protocol:'file:',
     slashes:true
   }));
   // Garbage collection
   addWindow.on('close',()=>{
     addWindow = null;
   })
}

//menu template
  const template = [
    {},
    {
      label:'New',
      submenu:[
       { 
         label: 'Check In',
         click(){
           createAddWindow();
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
       { label: 'Garda Number'},
       { label: 'Pat Number'},
       { label: 'Charlie Number'}
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