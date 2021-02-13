/* enforce.js
 *
 * Policy: All files can only be accessed once.
 *
 * AJAX methods that can be intercepted:
 *    XMLHttpRequest.prototype.open
 *    XMLHttpRequest.prototype.send
 */

(function () {

    /************* Interception Mechanism **************/

    function intercept (object, method, monitor) {
        // prototype inheritence not accounted for here.
        var original = object[method];
        object[method] = function () {
            // Note: "this" needs to be used instead of "object"
            // because of prototype inheritence.
            return monitor(this, original, arguments);
        };
    }

    /*************** Policy Enforcement ****************/

    var bannedLocations = new Set();

    // returns a new promise that just calls the failure callback.
    function getEmptyPromise () {
      return new Promise(function (onsuccess, onfailure) {
        onfailure("Request blocked by monitor");
      });
    }

    // If the URL is banned, returns an "empty promise" :)
    // otherwise bans future accesses and proceeds normally.
    intercept(window, "fetch", function (obj, func, args) {
      if (bannedLocations.has(args[0])) {
        console.log("MONITOR: blocking access to " + args[0]);
        return getEmptyPromise();
      }
      console.log("MONITOR: allowing access to " + args[0]);
      bannedLocations.add(args[0]);
      return func.apply(obj, args);
    });

})();
