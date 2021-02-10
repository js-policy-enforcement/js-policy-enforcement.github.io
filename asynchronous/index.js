/* index.js
 *
 * This file represents the untrusted application code that uses the API
 * functions. Application code needs to be loaded after the API and
 * enforcement code.
 */

function handlesend() {
  var sendto = document.getElementById("sendto-input").value;
  var msg = document.getElementById("msginput").value;
  api.sendSMS(sendto, msg);
}

// uses the contactsLookup (sychronous version) API call
function handleLookup() {
  var query = document.getElementById("lookup-input").value;
  var lookupResultLabel = document.getElementById("lookup-result");

  var result = api.contactLookup(query);
  if (result) {
    lookupResultLabel.innerHTML = result;
  } else {
    lookupResultLabel.innerHTML = "<em>contact not found</em>";
  }
}

// uses the contactsLookupAsync API call
// this is the one used by default
function handleLookupAsync() {
  var query = document.getElementById("lookup-input").value;
  var lookupResultLabel = document.getElementById("lookup-result");

  var onsuccess = function (phone) {
    lookupResultLabel.innerHTML = phone;
  }
  var onfailure = function () {
    lookupResultLabel.innerHTML = "<em>contact not found</em>";
  }
  api.contactLookupAsync(query, onsuccess, onfailure);
}
