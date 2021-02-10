/* enforce.js
 *
 * Policy: after a phone number has been read from the contact list, no
 * messages can be sent to that phone number.
 */

(function () {

    /************* Interception Mechanism **************/

    function intercept (object, method, monitor) {
        // prototype inheritence not accounted for here.
        var original = object[method];
        object[method] = function () {
            return monitor(object, original, arguments);
        };
    }

    /*************** Policy Enforcement ****************/

    var cantSendTo = new Set();

    // intercepting api.sendSMS
    intercept(api, "sendSMS", function (obj, func, args) {
        if (cantSendTo.has(args[0])) {
          console.log("MONITOR: blocked message destined for " + args[0]);
          return;
        }
        console.log("MONITOR: sending message destined for " + args[0]);
        return func.apply(obj, args);
    });

    // intercepting api.contactLookup
    intercept(api, "contactLookup", function (obj, func, args) {
        var ret = func.apply(obj, args);
        cantSendTo.add(ret);
        console.log("MONITOR: no sending to " + ret + " allowed");
        return ret;
    });

    // intercepting api.handleLookupAsync
    intercept(api, "contactLookupAsync", function (obj, func, args) {
      var newarg1 = function (phone) {
        cantSendTo.add(phone);
        console.log("MONITOR: no sending to " + phone + " allowed");
        (args[1])(phone);
      };
      return func.apply(obj, [args[0], newarg1, args[2]]);
    });

})();
