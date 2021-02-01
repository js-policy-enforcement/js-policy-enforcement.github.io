function handlesend() {
   var msg = document.getElementById("msginput").value;
   var to = document.getElementById("toinput").value;
   api.sendSMS(to, msg);
}
