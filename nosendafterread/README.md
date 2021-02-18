# No Send After Read

Go to [sample website](https://js-policy-enforcement.github.io/nosendafterread/index.html).

A simple temporal policy: the application is not allowed to send an SMS message after the contact list has been read from. The policy enforcement can be verified via a two step process:

1. Symbolic execution with JaVerT is used to prove properties about the enforcement code.
2. A NuSMV module is constructed using the properties from the first step.

Here is the (slightly simplified) enforcement code for convenience:

    var canSendSMS = true;

    intercept(api, "readContacts", function (obj, func, args) {
        canSendSMS = false;
        return func.apply(obj, args);
    });

    intercept(api, "sendSMS", function (obj, func, args) {
        if (!canSendSMS)
            return;
        return func.apply(obj, args);
    });

JaVerT is then used to prove that the new "readContacts" function does not modify the value of `canSendSMS`. With this property, the following NuSMV module is constructed. Each transition of the model corresponds to the untrusted code randomly invoking either `sendSMS` or `readContacts`. The `lastFuncCall` variable in the model stores this decision. The `lastEvent` variable indicates the last _original_ function that was called. The no-send-after-read policy itself is expressed as a CTL expression on the `lastEvent` variable.

    MODULE main
      VAR
        lastFuncCall : {send, read};
        lastEvent    : {send, read};
        canSendSMS   : boolean;
      ASSIGN
        init(lastEvent)    := send;
        init(canSendSMS)   := TRUE;
      TRANS
        case next(lastFuncCall) = send :
               (next(canSendSMS) = canSendSMS) &
               (!canSendSMS -> (next(lastEvent) = lastEvent)) &
               (canSendSMS -> (next(lastEvent) = send));
             next(lastFuncCall) = read :
               (next(canSendSMS) = FALSE) &
               (next(lastEvent) = read);
        esac;
      SPEC
        AG (lastEvent = read -> AG (lastEvent != send))
