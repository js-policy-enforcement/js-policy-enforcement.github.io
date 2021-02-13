# Monitoring AJAX

AJAX (Asynchronous JavaScript And XML) is the use of `XMLHttpRequest` objects
to send HTTP GET and POST requests. An "asynchronous" operation refers to
leveraging concurrency to perform two tasks in parallel: (1) waiting for the
request to be serviced and responding to the returned data and (2) continuing
the execution of the original JavaScript.

The basic usage of `XMLHttpRequest` is the following:

    // construct a request object
    var request = new XMLHttpRequest();

    // specify the requested resource and HTTP method for retrieving it
    request.open('GET', 'mydata.xml');

    // specify a callback function that is called whenever
    // request.readyState is changed.
    request.onreadystatechange = function () {
      // if request.readyState == 4, then the request is complete and
      // the data can be found in request.returnedText or returnedXML
    };

    // send the request
    request.send();

The primary methods we can intercept are the `open` and `send` functions of
the request objects which gives us control over when and where requests
are sent. Unfortunately, once a request has been opened, there is
no way to retrieve the request's URL. This means we need to capture the URL
argument to `open` and store it so that we can refer to it later when `send`
is called.
