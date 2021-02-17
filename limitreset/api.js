
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

    api: function () {
        alert("Reset API function called");
    }
};
