# Sample Websites

## Links to Sample Websites
 * [Automata](automata/index.html)
 * [Blacklist](blacklist/index.html)
 * [Censoring](censoring/index.html)
 * [Limit-Reset](limitreset/index.html)
 * [No-Send-After-Read](nosendafterread/index.html)
 * [Time Restriction](timerestriction/index.html)
 * [Asynchronous Callback](asynchronous/index.html)
 * [AJAX](ajaxmonitoring/index.html)

## Description

Each sample website may contains the following files:
 * `index.html` the entry point for the website
 * `index.js` contains untrusted code that invokes API methods
 * `api.js` represents the protected API functions
 * `enforce.js` the enforcement mechanism

Since output can come from the untrusted code, the API, or the enforcement mechanism, these examples were constructed under these general rules:
 * Enforcement code will output to the console with the prefix "MONITOR:" and will not modify the webpage or cause alerts.
 * Untrusted JavaScript will modify the webpage and will not cause alerts or print to the console.
 * API functions will cause alerts and will sometimes modify the webpage (such as for displaying SMS messages). API functions   will not output to the console.

## Enforcement Mechanism
The function `intercept(obj, func, monitor)` defined in `enforce.js` performs the inlining. It overwrites `obj[func]` with a new anonymous function that calls the monitor function.

Monitor functions should take three parameters: `(obj, func, args)`. The API method that was invoked is `obj[func]` and `args` is the list of arguments with which the API method was called. A general layout for a monitor function is the following:

    function aMonitorFunction(obj, func, args) {
        // if there is a policy violation, return early

        // update policy state as needed

        // inspect or modify original arguments

        // allow API call
        var ret = func.apply(obj, args);

        // inspect or modify value returned from API call

        return ret;
    }

After defining a monitor function, the monitor can be installed to monitor a method `api.aMethod` with

    intercept(api, "aMethod", aMonitorFunction);
