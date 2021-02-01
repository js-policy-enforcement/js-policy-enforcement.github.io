/* enforce.js
 *
 * This file contains code that enforces the no-send-after-read policy. It is
 * divided into two sections:
 *   Interception Mechanism - the function that inserts the monitor function
 *   Policy Enforcement - specifies policy state variables and monitor methods,
                          and uses the intercept function to embed the monitors.
 */

(function () {

    /************* Interception Mechanism **************/

    // monitors calls to object[method].
    // The monitor function needs to take the following parameters:
    //     obj: the object on which the method was invoked
    //     func: a string, the property of obj being invoked
    //     args: the arguments with which obj[func] was invoked
    // If there is no policy violation, the monitor function should
    // proceed with the original invocation
    // e.g. var ret = func.apply(obj, args)
    function intercept (object, method, monitor) {
        // prototype inheritence not accounted for here.
        var original = object[method];
        object[method] = function () {
            return monitor(object, original, arguments);
        };
    }

    /*************** Policy Enforcement ****************/

    // policy state
    var canSendSMS = true;

    // intercepting api.readContacts
    intercept(api, "readContacts", function (obj, func, args) {
        canSendSMS = false;
        console.log("MONITOR: no more SMS-sending allowed");
        return func.apply(obj, args);
    });

    // intercepting api.sendSMS
    intercept(api, "sendSMS", function (obj, func, args) {
        if (!canSendSMS) {
            console.log("MONITOR: blocking call to api.sendSMS");
            return;
        }
        console.log("MONITOR: allowing call to api.sendSMS");
        return func.apply(obj, args);
    });

})();
