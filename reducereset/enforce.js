/*
 * Policy: api.sendSMS can only be called a maximum of 5 times per session.
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

    var limit = 5;

    intercept(api, "sendSMS", function (obj, func, args) {
        if (limit <= 0) {
            console.log("MONITOR: blocking call because the limit was reached.");
            return;
        }
        limit -= 1;
        console.log("MONITOR: allowing call. " + limit + " calls left.");
        return func.apply(obj, args);
    });

    intercept(api, "reset", function (obj, func, args) {
        limit = 5;
        console.log("MONITOR: reseting limit to 5");
    });

})();
