define(["require", "exports"], function(require, exports) {
    /// <reference path="utils.ts" />
    var c_d = document;
    var c_w = window;
    var c_ie = !!c_w["ActiveXObject"];
    var c_ie6 = c_ie && !c_w["XMLHttpRequest"];
    var c_st = c_w.setTimeout;
    var c_ge = c_d.getElementById;

    // define event utility
    (function (c) {
        var cache = {};

        // c_evt.fire(event, arguments);
        function fire(e) {
            var handlers = cache[e];
            if (handlers) {
                for (var i = 0; i < handlers.length; i++) {
                    handlers[i](arguments);
                }
            }
        }
        c.fire = fire;

        // c_evt.bind(event, handler);
        function bind(event, handler) {
            var handlers = cache[event];
            if (!handlers) {
                handlers = [];
            }

            handlers.push(handler);
            cache[event] = handlers;
        }
        c.bind = bind;

        // c_evt.unbind(pressEvent, press);
        function unbind(event, handler) {
            var handlers = cache[event];
            if (handlers) {
                for (var i = 0; i < handlers.length; i++) {
                    if (handlers[i] == handler) {
                        handlers.splice(i, 1);
                    }
                }
            }
        }
        c.unbind = unbind;

        function be(element, event, handler) {
            if (element.addEventListener) {
                element.addEventListener(event, handler);
                return;
            }

            if (element.attachEvent) {
                element.attachEvent("on" + event, handler);
                return;
            }

            element["on" + event] = handler;
        }
        c.be = be;

        function ue(element, event, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(event, handler);
                return;
            }

            if (element.detachEvent) {
                element.detachEvent("on" + event, handler);
                return;
            }

            element["on" + event] = null;
        }
        c.ue = ue;
    })(exports.c || (exports.c = {}));
    var c = exports.c;
});
