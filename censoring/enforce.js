/*
 * Policy: phone numbers and dirty words in SMS messages are removed before
 * sending the message
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

    var censoredpatterns = [/[Dd]irty/g, /\d{3}\-\d{4}/g];

    intercept(api, "sendSMS", function (obj, func, args) {
        var newmsg = args[0];

        for (p of censoredpatterns) {
            newmsg = newmsg.replaceAll(p, " *** ");
        }

        args[0] = newmsg;
        return func.apply(obj, args);
    });

})();
