# Automaton-Specified Policy

Enforces a general policy specified by a finite state automaton. The FSA is encoded as a JavaScript object. This particular website enforces a limit-reset policy in this fashion, so the automaton found in `enforce.js` is the following:

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
