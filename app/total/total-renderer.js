const electron = require('electron');
const{ipcRenderer} = electron;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('app/db/database.sqlite3');
db.serialize(function() {
  // Render all receipts from db WHERE receptonist = 'theOneLoggedIn.toLowerCase()' AND between 'pressedLogIn time' and 'pressedLogOut time'
  db.each("SELECT rowid AS id, date, name, surname , room , heads , nights , price , payment, receptionist  FROM bookings", function(err, row) {
  var a =[];
  a.push(row);
  for (var i = 0; i < a.length; i++) {
      var tr = document.createElement("tr")
      for (var key of ['date', 'name', 'surname', 'room', 'heads', 'nights', 'price', 'payment', 'receptionist']) {
        var td = document.createElement("td")
        td.innerHTML = a[i][key]
        tr.appendChild(td)
      }
      document.getElementById("tableAll").appendChild(tr);
    }
  });
  // sum card
  db.each("SELECT SUM(price) FROM bookings WHERE payment = 'card' ", function(err, totalCard) {
    console.log('total card: ' + totalCard["SUM(price)"]);
  });
  //sum cash
  db.each("SELECT SUM(price) FROM bookings WHERE payment = 'cash' ", function(err, totalCash) {
    console.log('total cash: '+totalCash["SUM(price)"]);
  });
  //sum total
  db.each("SELECT SUM(price) FROM bookings", function(err, total) {
  console.log('grand total: '+total["SUM(price)"]);
  });
});