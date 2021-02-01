/*
 * Policy: blacklist
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

    var blacklist = ["Mark", "Sara", "John", "Will"];

    intercept(api, "sendSMS", function (obj, func, args) {
        for (receiver of blacklist) {
            if (args[0] == receiver) {
              console.log("MONITOR: SMS blocked. " + receiver + " is blacklisted");
              return;
            }
        }
        console.log("MONITOR: SMS allowed. " + args[0] + " is not blacklisted");
        return func.apply(obj, args);
    });

})();
