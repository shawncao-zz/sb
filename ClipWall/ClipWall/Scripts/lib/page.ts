/// <reference path="utils.ts" />
var c_d = document;
var c_w = window;
var c_ie = !!c_w["ActiveXObject"];
var c_ie6 = c_ie && !c_w["XMLHttpRequest"];
var c_st = c_w.setTimeout;
var c_ge = c_d.getElementById;

// define event utility
export module c {
    var cache: any = {};
    // c_evt.fire(event, arguments);
    export function fire(e) {
        var handlers = cache[e];
        if (handlers) {
            for (var i = 0; i < handlers.length; i++) {
                handlers[i](arguments);
            }
        }
    }

    // c_evt.bind(event, handler);
    export function bind(event: string, handler: () => any) {
        var handlers = cache[event];
        if (!handlers) {
            handlers = [];
        }

        handlers.push(handler);
        cache[event] = handlers;
    }

    // c_evt.unbind(pressEvent, press);
    export function unbind(event: string, handler: () => any) {
        var handlers = cache[event];
        if (handlers) {
            for (var i = 0; i < handlers.length; i++) {
                if (handlers[i] == handler) {
                    handlers.splice(i, 1);
                }
            }
        }
    }

    export function be(element: HTMLElement, event: string, handler: (evt) => any) {
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

    export function ue(element: HTMLElement, event: string, handler: (evt) => any) {
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
}

