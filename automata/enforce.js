/*
 * Enforces a policy described by a finite state automaton
 */

function handlereset () {
    alert("Reset button pressed");
}

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

    function enforceAutomata (automata, transitionbindings) {
        var state = automata.initialstate;

        var getMonitorFunction = function (transition) {
            return function (obj, func, args) {
                newstate = automata.transitions[state][transition];
                if (newstate === undefined || !(newstate in automata.transitions)) {
                    console.log("MONITOR: transition '"+transition+"' not allowed from state "+state);
                    return;
                }
                state = newstate;
                console.log("MONITOR: new state is " + state);
                func.apply(obj, args);
            };

        };

        for (binding of transitionbindings) {
            intercept(binding.object, binding.method, getMonitorFunction(binding.transition));
        }
    }

    // The finite state automaton described as a JS object.
    var reduceResetAutomata = {
        "initialstate": "5",
        "transitions": {
            "0": {"reset": "5"},
            "1": {"reduce": "0", "reset": "5"},
            "2": {"reduce": "1", "reset": "5"},
            "3": {"reduce": "2", "reset": "5"},
            "4": {"reduce": "3", "reset": "5"},
            "5": {"reduce": "4", "reset": "5"}
        }
    };

    // specifies which API methods correspond to which transitions in the FSA.
    var transitionbindings = [
        {"object": api, "method": "sendSMS", "transition": "reduce"},
        {"object": window, "method": "handlereset", "transition": "reset"}
    ];

    enforceAutomata(reduceResetAutomata, transitionbindings);

})();
