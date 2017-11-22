const printPDFButton = document.getElementById('print-pdf');

printPDFButton.addEventListener('click', function(event){
    printPDFButton.style.visibility = "hidden"; //hide button before print window
    window.print();
})
