const electron = require('electron');
const {ipcRenderer, remote} = require('electron');

//***5. listen data from global variable setted up at Main
let data = remote.getGlobal('checkInData');
console.log(data); //=> object
//console.log(data['name']);
//and print that data in the receipt: 
document.getElementById('output-date').innerHTML = data['date'];
document.getElementById('output-hour').innerHTML = data['hour'];
document.getElementById('output-name').innerHTML = data['name'];
document.getElementById('output-surname').innerHTML = data['surname'];
document.getElementById('output-room').innerHTML = data['room'];
document.getElementById('output-heads').innerHTML = data['heads'];
document.getElementById('output-nights').innerHTML = data['nights'];
document.getElementById('output-price').innerHTML = data['price'];
document.getElementById('output-payment').innerHTML = data['payment'];
document.getElementById('receptionist').innerHTML = data['receptionist'];

// 'print' button
const printPDFButton = document.getElementById('print-pdf');
printPDFButton.addEventListener('click', function(event){
    //hide buttons before print window
    printPDFButton.style.visibility = "hidden";
    cancelButton.style.visibility = "hidden";
    window.print();
})
//'Cancel' button
const cancelButton = document.getElementById('cancel');
cancelButton.addEventListener('click', function(event){
    window.close();
})
