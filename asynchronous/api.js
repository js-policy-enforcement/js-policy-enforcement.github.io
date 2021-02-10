/* api.js
 *
 * This file represents an API that needs to be protected.
 */

var api = {
    sendSMS: function (sendTo, msg) {
        var table = document.getElementById("message-table");
        var row = table.insertRow(1);
        var now = new Date();
        row.insertCell(0).innerHTML = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
        row.insertCell(1).innerHTML = sendTo;
        row.insertCell(2).innerHTML = msg;

        if (table.rows.length >= 11)
            table.deleteRow(11);
    },

    // looks up the contact synchronously
    contactLookup: function (query) {
      var request = new XMLHttpRequest();
      request.open('GET', 'contacts.xml', false);
      request.send(null);
      if (request.status !== 200) {
        console.log("Error reading contact list");
        return;
      }
      var people = request.responseXML.getElementsByTagName("person");
      for (var i = 0; i < people.length; i++) {
        if (people[i].getAttribute("name") === query) {
          var phone = people[i].getElementsByTagName("phone")[0].textContent;
          return phone;
        }
      }
      return null;
    },

    // looks up the contact asynchronously
    contactLookupAsync: function (query, onsuccess, onfailure) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState !== 4) return;
        if (request.status !== 200) {onfailure(); return;}

        var people = request.responseXML.getElementsByTagName("person");
        for (var i = 0; i < people.length; i++) {
          if (people[i].getAttribute("name") === query) {
            var phone = people[i].getElementsByTagName("phone")[0].textContent;
            onsuccess(phone);
            return;
          }
        }
        onfailure();
      }
      request.open('GET', 'contacts.xml');
      request.send(null);
    }
};
