const electron = require('electron');
const {BrowserWindow} = require('electron').remote;
const {ipcRenderer, remote} = require('electron'); 
const moment = require('moment');

const form = document.querySelector('form');
form.addEventListener('submit', submitCheckIn);

function submitCheckIn(e){
    e.preventDefault();
    //inputs
    let name = document.querySelector('#name').value;
    let surname = document.querySelector('#surname').value;
    let room = document.querySelector('#room').value;
    let heads = document.querySelector('#heads').value;
    let nights = document.querySelector('#nights').value;
    let price = document.querySelector('#price').value;
    let payment = document.querySelector('#payment').value;
    let date = moment().subtract(10, 'days').calendar();//Date
    let hour = moment().format('LTS');//Hour

    
    //if no value
    if( name == '' || surname == '' || heads == '' || nights == '' || price == ''){ 
        alert('fill up all fields');
        return;
    }else{

    //***1.send form input data to main process
    ipcRenderer.send('check-in-input',{date, hour, name, surname, room, heads, nights, price, payment});
    
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

