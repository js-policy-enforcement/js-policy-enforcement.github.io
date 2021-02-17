
function handlesend() {
   var msg = document.getElementById("msginput").value;
   api.sendSMS(msg);
}

function handlereset() {
   api.reset();
}
