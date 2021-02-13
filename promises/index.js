/* index.js
 *
 * This file represents the untrusted application code that uses the API
 * functions. Application code needs to be loaded after the API and
 * enforcement code.
 */

function fileRequest (whichfile) {
  var filename = "data" + whichfile + ".xml";
  var reslabel = document.getElementById("result-label");

  fetch(filename)
    .then(rsp => rsp.text())
    .then(txt => reslabel.innerHTML = txt,
          err => reslabel.innerHTML = "Error: " + err);
}
