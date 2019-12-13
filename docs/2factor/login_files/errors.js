/* global Bugsnag */
/* eslint-disable */

(function() {
    
    // Some browsers don't include the error object when throwing, so it will be
    // difficult to track if an error has already notified.  This is an abuse
    // of closure and could result in race conditions, I suppose, but it
    // should work in most cases.
    var hasNotified = null;

    function serialize(data) {
        return Object.keys(data)
            .filter(function(key) {
                return data[key];
            })
            .map(function(key) {
                return key + '=' + data[key];
            })
            .join('&');
    }

    function notify(data) {
        // Some servs require an XSRF for POST (adminserv), some do
        // not (frameserv)
        var xsrf = document.querySelector('[name="_xsrf"]');
        if (xsrf) {
            data._xsrf = xsrf.value;
        }


        // Servs control the path to which the BrowserExceptionHandler is
        // mounted, so we use a data- attribute on the script tag so we know
        // here where to send the exception.
        // (optional, defaults to /browser_exception)
        var url = '/browser_exceptions';
        var script = document.getElementById('browser_exceptions');
        if (script && script.hasAttribute('data-url')) {
            url = script.getAttribute('data-url');
        }
        
        // include the SID so frameserv logs will have useful metadata
        var sidElements = document.getElementsByName("sid");
        if (sidElements.length) {
            data.sid = sidElements[0].value;
        }

        data.location = window.location.href;

        var request = new XMLHttpRequest();

        request.open('POST', url);

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        request.send(serialize(data));
    }

    function wrap(func) {
        if (typeof func !== 'function') {
            return func;
        }
        try {
            if (!func._wrapped) {
                func._wrapped = function() {
                    try {
                        return func.apply(this, arguments);
                    } catch(e) {
                        var data = {
                            message: e.message,
                            file: e.file,
                            line: e.line,
                            col: e.col
                        };

                        if (e.stack) {
                            data.stack = e.stack.split('\n');
                        }

                        notify(data);

                        hasNotified = true;

                        throw e;
                    }
                };
            }
        } catch(err) {
            // Another selenium fix, don't fail on privileged functions.
            return func;
        }

        return func._wrapped;
    }

    function polyfill(obj, name, pf) {
        obj[name] = pf(obj[name]);
    }

    function hijackOnerror(onerror) {
        return function(msg, file, line, col, e) {
            var data = {
                message: msg,
                file: file,
                line: line,
                col: col
            };

            if (e && e.error && e.error.stack) {
                e.stack = e.error.stack.split('\n');
            }

            if (!hasNotified) {
                notify(data);
            }

            hasNotified = null;

            if (onerror) {
                onerror.call(this, arguments);
            }
        };
    }

    function hijackTimer(timer) {
        return function(func, t) {
            return timer(wrap(func), t);
        };
    }

    function hijackEvent(el) {
        return function(e, f, capture, secure) {
            try {
                if (f && f.handleEvent) {
                    f.handleEvent = wrap(f.handleEvent);
                }
            } catch(err)  {
                // Selenium does this same thing, which can cause a race.
                // Just skip it if that happens.
            }

            return el.call(this, e, wrap(f), capture, secure);
        };
    }
    
    if (!window.Bugsnag) {

        window.initErrorHandlers = function() {
            polyfill(window, 'onerror', hijackOnerror);

            polyfill(window, 'setTimeout', hijackTimer);
            polyfill(window, 'setInterval', hijackTimer);

            if (window.requestAnimationFrame) {
                polyfill(window, 'requestAnimationFrame', hijackTimer);
            }

            var objs = [
                window.EventTarget,
                window.Window,
                window.ModalWindow,
                window.EventSource,
                window.FileReader,
                window.WebSocket,
                window.XMLHttpRequest,
                window.XMLHttpRequestEventTarget
            ];

            var obj;

            for (var i = 0; i < objs.length; ++i) {
                obj = objs[i];

                if (obj && obj.prototype && Object.prototype.hasOwnProperty.call(obj.prototype, 'addEventListener')) {
                    polyfill(obj.prototype, 'addEventListener', hijackEvent);

                    polyfill(obj.prototype, 'removeEventListener', hijackEvent);
                }
            }
        };
        
    }
    
}());
