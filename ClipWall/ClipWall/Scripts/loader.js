var ClipWall;
(function (ClipWall) {
    // define global variables
    (function (g) {
        g.d = document;
        g.w = window;
        g.ie = !!g.w["ActiveXObject"];
        g.ie6 = g.ie && !g.w["XMLHttpRequest"];
        g.st = g.w.setTimeout;
        g.ge = function (id) {
            return g.d.getElementById(id);
        };
        g.gt = function (tag) {
            return g.d.getElementsByTagName(tag);
        };
        g.ce = function (tag) {
            return g.d.createElement(tag);
        };
        g.at = function (elem, name, val) {
            return elem.setAttribute(name, val);
        };

        //replace this with final domain when publish
        g.h = "http://localhost:22128/";
    })(ClipWall.g || (ClipWall.g = {}));
    var g = ClipWall.g;

    // define events utility
    (function (e) {
        // private fields
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
        e.fire = fire;

        // c_evt.bind(event, handler);
        function bind(event, handler) {
            var handlers = cache[event];
            if (!handlers) {
                handlers = [];
            }

            handlers.push(handler);
            cache[event] = handlers;
        }
        e.bind = bind;

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
        e.unbind = unbind;

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
        e.be = be;

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
        e.ue = ue;

        function trigger(element, event) {
            if (element.dispatchEvent) {
                var e = g.d.createEvent("HTMLEvents");
                e.initEvent(event.type, true, false);
                element.dispatchEvent(e);
            } else if (element.fireEvent) {
                element.fireEvent("on" + event.type);
            }
        }
        e.trigger = trigger;
    })(ClipWall.e || (ClipWall.e = {}));
    var e = ClipWall.e;
})(ClipWall || (ClipWall = {}));
/// <reference path="page.ts" />
var ClipWall;
(function (ClipWall) {
    //define utlity
    (function (u) {
        function evt(e) {
            var event = e || ClipWall.g.w.event;
            if (!event.target) {
                event.target = event.srcElement;
            }

            return event;
        }
        u.evt = evt;

        function fullpath(rel) {
            return ClipWall.g.h + rel;
        }
        u.fullpath = fullpath;

        function contains(elem1, elem2) {
            if (elem1 && elem2) {
                while (elem2) {
                    if (elem1 == elem2) {
                        return true;
                    }

                    elem2 = elem2.parentElement;
                }
            }

            return false;
        }
        u.contains = contains;

        function stop(event) {
            event.stopImmediatePropagation();
            event.preventDefault();
        }
        u.stop = stop;
    })(ClipWall.u || (ClipWall.u = {}));
    var u = ClipWall.u;
})(ClipWall || (ClipWall = {}));
/// <reference path="page.ts" />
/// <reference path="utils.ts" />
// define CSS utility
var ClipWall;
(function (ClipWall) {
    (function (Css) {
        function load(path) {
            var s = ClipWall.g.ce('link');
            ClipWall.g.at(s, 'type', 'text/css');
            ClipWall.g.at(s, 'rel', 'stylesheet');
            ClipWall.g.at(s, 'href', ClipWall.u.fullpath(path));
            ClipWall.g.gt('body')[0].appendChild(s);
        }
        Css.load = load;
        function add(elem, className) {
            if (contains(elem, className)) {
                return;
            }

            elem.className += ' ' + className;
        }
        Css.add = add;

        function remove(elem, className) {
            if (!contains(elem, className)) {
                return;
            }

            var classList = elem.className.split(' ');
            var classId = classList.indexOf(className);
            if (classId >= 0) {
                classList.splice(classId, 1);
            }

            elem.className = classList.join(' ');
        }
        Css.remove = remove;

        function toggle(elem, className) {
            if (contains(elem, className)) {
                remove(elem, className);
            } else {
                add(elem, className);
            }
        }
        Css.toggle = toggle;

        function contains(elem, className) {
            var classList = elem.className.split(' ');
            return classList.indexOf(className) >= 0;
        }
        Css.contains = contains;

        function show(elem, s) {
            if (typeof s === "undefined") { s = true; }
            alert(elem.style.display);
            elem.style.display = s ? 'block' : 'none';
            
        }
        Css.show = show;
    })(ClipWall.Css || (ClipWall.Css = {}));
    var Css = ClipWall.Css;
})(ClipWall || (ClipWall = {}));
var ClipWall;
(function (ClipWall) {
    var Panel = (function () {
        function Panel(mode) {
            this.mode = mode;
        }
        Panel.CreatePanel = function () {
            return new Panel(0);
        };
        return Panel;
    })();
    ClipWall.Panel = Panel;
})(ClipWall || (ClipWall = {}));
/// <reference path="clip.ts" />
/// <reference path="../lib/page.ts" />
/// <reference path="../lib/utils.ts" />
var ClipWall;
(function (ClipWall) {
    var ClickMode = (function () {
        function ClickMode(selection) {
            if (typeof selection === "undefined") { selection = []; }
            var _this = this;
            this.selection = selection;
            this.mouseOver = function (e) {
                if (_this.forward(e)) {
                    ClipWall.Css.remove(this.greyoutDiv, "hidden");
                    return;
                }

                _this.overTarget(ClipWall.u.evt(e).target);
                ClipWall.u.stop(e);
            };

            this.mouseClick = function (e) {
                if (_this.forward(e)) {
                    ClipWall.Css.remove(this.greyoutDiv, "hidden");
                    return;
                }

                _this.clickTarget(ClipWall.u.evt(e).target);
                ClipWall.u.stop(e);
            };

            // create grey out overlay
            this.greyoutDiv = this.greyout();
        }
        ClickMode.prototype.apply = function () {
            this.hook(true);
            ClipWall.Css.remove(this.greyoutDiv, "hidden");
        };

        ClickMode.prototype.dispose = function () {
            this.hook(false);
            ClipWall.Css.add(this.greyoutDiv, "hidden");
        };

        ClickMode.prototype.hook = function (bind) {
            var handle = bind ? ClipWall.e.be : ClipWall.e.ue;
            handle(ClipWall.g.d, "mouseover", this.mouseOver);
            handle(ClipWall.g.d, "click", this.mouseClick);
        };

        ClickMode.prototype.greyout = function () {
            var s = ClipWall.g.ce('div');
            ClipWall.g.at(s, 'class', 'greyout');
            // ClipWall.g.at(s, "style", "display:none");
            ClipWall.g.gt('body')[0].appendChild(s);
            return s;
        };

        ClickMode.prototype.overTarget = function (target) {
            if (target != this.lastElem) {
                if (this.lastElem && this.selection.indexOf(this.lastElem) < 0) {
                    ClipWall.Css.remove(this.lastElem, "focus");
                }

                ClipWall.Css.add(target, "focus");
                this.lastElem = target;
            }
        };

        ClickMode.prototype.clickTarget = function (target) {
            if (ClipWall.u.contains(this.lastElem, target)) {
                this.selection.push(this.lastElem);
            }
        };

        ClickMode.prototype.forward = function (event) {
            var target = ClipWall.u.evt(event).target;
            if (target === this.greyoutDiv && ClipWall.g.ie) {
                var me = event;
                if (me) {
                    ClipWall.Css.add(this.greyoutDiv, "hidden");
                    var div = this.greyoutDiv;
                    var under = ClipWall.g.d.elementFromPoint(me.clientX, me.clientY);
                    setTimeout(function () {
                        ClipWall.Css.remove(div, "hidden");
                    }, 100);
                    if (under && under !== this.greyoutDiv) {
                        switch (event.type) {
                            case "mouseover":
                                this.overTarget(under);
                                return true;
                            case "click":
                                this.clickTarget(under);
                                return true;
                            default:
                                return false;
                        }
                        // event forwarding is not working well in IE
                        // IE is really a bitch !!! how can it be so bad???
                        // e.trigger(under, event);
                    }
                }
            }

            return false;
        };
        return ClickMode;
    })();
    ClipWall.ClickMode = ClickMode;
})(ClipWall || (ClipWall = {}));
/// <reference path="../lib/page.ts" />
/// <reference path="../lib/utils.ts" />
/// <reference path="../lib/css.ts" />
/// <reference path="panel.ts" />
/// <reference path="mode.click.ts" />
var loaded;

if (!loaded) {
    loaded = true;

    // load css file we need
    ClipWall.Css.load("clip");

    // create a panel
    ClipWall.Panel.CreatePanel();

    // use one clip mode for testing
    var mode = new ClipWall.ClickMode();
    mode.apply();
}
