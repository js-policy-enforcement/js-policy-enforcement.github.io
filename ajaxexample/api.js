/* api.js
 *
 * This file represents an API that needs to be protected.
 */

var api = {
    sendSMS: function (msg) {
        var table = document.getElementById("message-table");
        var row = table.insertRow(1);
        var now = new Date();
        row.insertCell(0).innerHTML = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
        row.insertCell(1).innerHTML = msg;

        if (table.rows.length >= 11)
            table.deleteRow(11);
    },

    readContacts: function () {
       alert("Reading contact list...");
       var contacts = [
           {name: "John", phone: "123-4567"},
           {name: "Mark", phone: "555-6789"},
           {name: "Will", phone: "999-1010"},
           {name: "Sara", phone: "404-5030"}
       ];
       var i = Math.floor(Math.random()*4);
       return contacts[i];
    }
};
