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

    // This version stores the values locally.
    // getMonitor(obj, prop, getv, setv) -> val
    // setMonitor(obj, prop, val, getv, setv)
    function interceptProperty (object, property, getMonitor, setMonitor) {
        var original = object[property];
        var getv = function () {return original;}
        var setv = function (val) {original = val;}
        Object.defineProperty(object, property, {
            get: function () {return getMonitor(this, property, getv, setv);},
            set: function (val) {setMonitor(this, property, val, getv, setv);}
        });
    }

    /*************** Policy Enforcement ****************/

    // stores the URL for each open XMLHttpRequest object since
    // it is not accessible after being opened
    var locations = new Map();
    var bannedLocations = new Set();

    // intercepting AJAX's open method
    intercept(XMLHttpRequest.prototype, "open", function (obj, func, args) {
      locations.set(obj, args[1]);
      return func.apply(obj, args);
    });

    intercept(XMLHttpRequest.prototype, "send", function (obj, func, args) {
      if (!locations.has(obj)) return;
      var loc = locations.get(obj);
      if (bannedLocations.has(loc)) {
        console.log("MONITOR: blocking send to " + loc);
        // TODO: is there a way to make it look like the request failed?
        // I tried directly modifying the obj.readyState property, but
        // that doesn't work for some reason. obj.abort also doesn't work
        return;
      }
      console.log("MONITOR: allowing send to " + loc);
      bannedLocations.add(loc);
      return func.apply(obj, args);
    });

})();
