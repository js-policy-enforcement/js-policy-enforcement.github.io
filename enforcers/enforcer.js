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

    function getLimitMonitor (limit) {
        return function (obj, func, args) {
            if (limit <= 0) {
                console.log("MONITOR: blocking call because the limit was reached.");
                return;
            }
            limit -= 1;
            console.log("MONITOR: allowing call. " + limit + " calls left.");
            func.apply(obj, args);
        };
    }

    function getTimeRestrictionMonitor(fromHour, toHour) {
        if (fromHour < 0 || fromHour >= 24 || toHour < 0 || toHour >= 24)
            throw "Error: cannot enforce time restriction policy. Invalid time!";

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

        return function (obj, func, args) {
            var now = new Date().getHours();
            if ((low <= now && now < high && !allow) ||
                ((now < low || high <= now) && allow)) {
                console.log("MONITOR: blocking call due to time restriction.");
                return;
            }
            console.log("MONITOR: allowing call. Not within time restriction.");
            func.apply(obj, args);
        }
    }

    intercept(api, "sendSMS", getLimitMonitor(5));
    intercept(api, "readContacts", getTimeRestrictionMonitor(6, 7));

})();
