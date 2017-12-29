const electron = require('electron');
const{ipcRenderer} = electron;
//Login Page
document.querySelector('form').addEventListener('submit', login);
function login(e){
  e.preventDefault();
  let receptionistName = document.querySelector('#receptionistName').value;
  if(receptionistName != ''){
    // New local storage when press login and store temporary all receiots until press Logout.
    // at the same time save in sqlite permanent all receipts for the  weekly total.
    // store receptionistNAme as a global var 
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('logout').style.display = 'block';
    document.getElementById('greeting').innerHTML = receptionistName;

    ipcRenderer.send('login',receptionistName);
  }else{
    console.log('Write your name madafakaa!!')
  }
}
//render the checkIn input data into a table
ipcRenderer.on('check-in-input',(e,{date,hour, name, surname, room, heads, nights, price, payment})=>{
  var newRow = `<tr>
                <td>${date}</td>
                <td>${hour}</td>
                <td>${name}</td>
                <td>${surname}</td>
                <td>${room}</td>
                <td>${heads}</td>
                <td>${nights}</td>
                <td>${price}</td>
                <td>${payment}</td>
              </tr>`;
  document.getElementById("tableAll").innerHTML += newRow;
})