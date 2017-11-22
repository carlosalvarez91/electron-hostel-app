const ipc = require('electron').ipcRenderer;

const printPDFButton = document.getElementById('print-pdf');

printPDFButton.addEventListener('click', function(event){
    printPDFButton.style.visibility = "hidden"; //hide button before print screenshot
    ipc.send('print-to-pdf');
})

ipc.on('wrote-pdf', function(event,path){
    const message = `wrote PDF to: ${path}`;
    document.getElementById('pdf-path').innerHTML = message;
})