const electron = require('electron');
const {BrowserWindow} = require('electron').remote;
const {ipcRenderer, remote} = require('electron'); 

const form = document.querySelector('form');
form.addEventListener('submit', submitCheckIn);

function submitCheckIn(e){
    e.preventDefault();
    //inputs
    const name = document.querySelector('#name').value;
    const surname = document.querySelector('#surname').value;
    const room = document.querySelector('#room').value;
    const heads = document.querySelector('#heads').value;
    const nights = document.querySelector('#nights').value;
    const price = document.querySelector('#price').value;
    const payment = document.querySelector('#payment').value;
    const date = new Date().toUTCString();//date
    //if no value
    if( name == '' || surname == '' || heads == '' || nights == '' || price == ''){ 
        alert('fill up all fields');
        return;
    }else{

    //***1.send form input data to main process
    ipcRenderer.send('check-in-input',{date, name, surname, room, heads, nights, price, payment});
    
    //***4.open reciept window
    let win = new BrowserWindow({width: 595, height: 842}) // A4
    win.loadURL(`file://${__dirname}/../receipt/receipt.html`)

    }
}
//'Cancel' button
const cancelButton = document.getElementById('cancel');
cancelButton.addEventListener('click', function(event){
    window.close();
});

