
function handleread() {
    api.readContacts();
}

function handlesend() {
   var msg = document.getElementById("msginput").value;
   api.sendSMS(msg);
}
