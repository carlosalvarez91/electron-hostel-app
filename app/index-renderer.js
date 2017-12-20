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
//logout
function logout(e){
  document.getElementById('loginScreen').style.display = 'block';
  ipcRenderer.send('logout', (e));//destroy receptionist var
 //destroy table
  var Parent = document.getElementById('tableAll');//destroy table
  Parent.parentNode.removeChild(Parent);

  //create new table
  //Build an array containing Title records.
  var titles = new Array();
  titles.push(["Date", "Name", "Surname","Room","Heads","Nights","Price","Payment"]);

  //Create a HTML Table element.
  var table = document.createElement("TABLE");

  //Get the count of columns.
  var columnCount = titles[0].length;

  //Add the header row.
  var row = table.insertRow(-1);
  for (var i = 0; i < columnCount; i++) {
      var headerCell = document.createElement("TH");
      headerCell.innerHTML = titles[0][i];
      row.appendChild(headerCell);
  }
  var dvTable = document.getElementById("newTable");
  dvTable.innerHTML = "";
  dvTable.appendChild(table);
  //set id to table
  table.setAttribute("id", "tableAll");
}
//render the checkIn input data into a table
ipcRenderer.on('check-in-input',(e,{date, name, surname, room, heads, nights, price, payment})=>{
  var newRow = `<tr>
                <td>${date}</td>
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