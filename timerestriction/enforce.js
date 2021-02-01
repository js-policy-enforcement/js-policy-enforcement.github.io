/*
 * Policy: SMS messages cannot be sent during a specified time interval
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

    // block sending SMS messages from 8pm to 8am
    var fromHour = 20, toHour = 8;

    if (fromHour < 0 || fromHour >= 24 || toHour < 0 || toHour >= 24)
        throw "MONITOR: ERROR: cannot enforce time restriction policy. Invalid time!";

    var low, high, allow;
    if (toHour <= fromHour) {
        low = toHour;
        high = fromHour;
        allow = true;
    } else {
        low = fromHour;
        high = toHour;
        allow = false;
    }

    intercept(api, "sendSMS", function(obj, func, args) {
        var now = new Date().getHours();
        if ((low <= now && now < high && !allow) ||
            ((now < low || high <= now) && allow)) {
            console.log("MONITOR: blocking call due to time restriction.");
            return;
        }
        console.log("MONITOR: allowing call. Not within time restriction.");
        func.apply(obj, args);
    });

})();
