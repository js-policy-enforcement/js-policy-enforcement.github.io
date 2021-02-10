# Monitoring Asynchronous Callbacks

Monitoring the data passed to and from an API call is straightforward if the
data is passed using parameters and the return value. However, monitoring
becomes harder with API functions that use callback functions to pass back
information. The example used in this website is the `contactLookupAsync`
function:

    contactLookupAsync = function (person_name, onsuccess, onfailure) {
        var phone = null;
        // lookup the phone number of the person, if found
        // store the number in phone.
        if (phone)
            onsuccess(phone);
        else
            onfailure();
    }

This function looks up the phone number corresponding to given person's name.
Instead of returning the phone number directly, it instead calls the `onsuccess`
callback function, passing the number as an argument. This means the monitor
cannot just proceed with the original function call since `contactLookupAsync`
passes information directly back to the original caller:

    intercept(api, "contactLookupAsync", function (obj, func, args) {
      var ret = func.apply(obj, args);
      // Problem: ret does not give us any information.
      return ret;
    });

What we can do is modify the `onsuccess` argument to `contactLookupAsync`. We
will wrap the callback function with our own code before passing it on:

    intercept(api, "contactLookupAsync", function (obj, func, args) {
      // define a new onsuccess callback
      var newOnSuccess = function (phone) {
        // here we can examine the phone number in the argument phone

        // proceed with original onsuccess call.
        (args[1])(phone);
      };

      // proceed with original call to contactLookupAsync with the
      // modified onsuccess callback
      return func.apply(obj, [args[0], newarg1, args[2]]);
    });
