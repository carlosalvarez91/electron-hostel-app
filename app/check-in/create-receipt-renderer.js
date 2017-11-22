const {BrowserWindow} = require('electron').remote;

const doneButton = document.getElementById('done');

doneButton.addEventListener('click', function(event){
    //open new window receipt.html, with the check-in.html data
   let win = new BrowserWindow({width: 595, height: 842}) // A4
    win.loadURL(`file://${__dirname}/../receipt/receipt.html`)
})