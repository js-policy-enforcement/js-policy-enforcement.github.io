# Fetch and Promises

Conceptually, a promise is just some code (producing code) with two "holes"
(for success/failure consuming code) that can be filled in later. A promise
exhibits monad-like behavior because the `then` function behaves like the bind
operator. The main differences are
 * `then` takes two functions (for a success and failure) instead of just one.
 * the function arguments to `then` can return other objects besides promises.

Here is a simple example of using `fetch(url)`, a function that returns a
promise to get the file contents at the specified URL.

    fetch("data1.xml").then(
      function (response) {
        return response.text();
      },
      function (error) { }
    ).then(
      function (text) {
        console.log(text);
      },
      function (error) { }
    );

By intercepting `fetch`, we can conditionally allow or block the resource
access based on the URL. If we want to block the access, we can return an
"empty promise" (a promise that always fails) instead of the promise returned
by `fetch`.
