const electron = require('electron');
const {BrowserWindow} = require('electron').remote;
const {ipcRenderer} = require('electron'); 

const form = document.querySelector('form');
form.addEventListener('submit', submitCheckIn);

function submitCheckIn(e){
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const surname = document.querySelector('#surname').value;
    const room = document.querySelector('#room').value;
    const heads = document.querySelector('#heads').value;
    const nights = document.querySelector('#nights').value;
    const price = document.querySelector('#price').value;
    const payment = document.querySelector('#payment').value;
    //***1.send form input data to main process
    ipcRenderer.send('check-in-input',{name, surname, room, heads, nights, price, payment});

}
//'Done' button
const doneButton = document.getElementById('done');
doneButton.addEventListener('click', function(event){
    //***4.open reciept window
   let win = new BrowserWindow({width: 595, height: 842}) // A4
    win.loadURL(`file://${__dirname}/../receipt/receipt.html`)
})

