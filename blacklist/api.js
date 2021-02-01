/* api.js
 *
 * This file represents an API that needs to be protected.
 */

var api = {
    sendSMS: function (to, msg) {
        var table = document.getElementById("message-table");
        var row = table.insertRow(1);
        var now = new Date();
        row.insertCell(0).innerHTML = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
        row.insertCell(1).innerHTML = to;
        row.insertCell(2).innerHTML = msg;

        if (table.rows.length >= 11)
            table.deleteRow(11);
    }
};
