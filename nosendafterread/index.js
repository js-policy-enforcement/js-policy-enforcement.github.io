/* index.js
 *
 * This file represents the untrusted application code that uses the API
 * functions. Application code needs to be loaded after the API and
 * enforcement code.
 */

function handleread() {
    var contact = api.readContacts();
    var label = document.getElementById("contacts-read-label");
    label.innerHTML = "Found <b>" + contact.name + "</b> with phone <b>"
                      + contact.phone + "</b> in contacts list ";
}

function handlesend() {
   var msg = document.getElementById("msginput").value;
   api.sendSMS(msg);
}
