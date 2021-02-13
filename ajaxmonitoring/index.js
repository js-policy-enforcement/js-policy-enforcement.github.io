/* index.js
 *
 * This file represents the untrusted application code that uses the API
 * functions. Application code needs to be loaded after the API and
 * enforcement code.
 */

function ajaxRequest (whichfile) {
  var filename = "data" + whichfile + ".xml";
  var reslabel = document.getElementById("result-label");

  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState !== 4) {console.log("In onreadystatechange: " + request.readyState); return;}

    if (request.status === 200) {
      reslabel.innerHTML = request.responseText;
    } else {
      reslabel.innerHTML = "Error, request failed";
    }
  }
  request.onabort = function () {
    reslabel.innerHTML = "Error, request was aborted";
  }
  request.open('GET', filename);
  request.send(null);
}
