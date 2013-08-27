var ClipWall;
(function (ClipWall) {
    // define global variables
    (function (g) {
        g.d = document;
        g.w = window;
        g.b = g.d.body || g.gt('body')[0];
        g.ie = !!g.w["ActiveXObject"];
        g.ie6 = g.ie && !g.w["XMLHttpRequest"];
        g.st = function (handler, time) {
            return g.w.setTimeout(handler, time);
        };
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

        function format(pattern) {
            var ps = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                ps[_i] = arguments[_i + 1];
            }
            if (!valid(ps)) {
                return pattern;
            }

            if (empty(pattern)) {
                return ps.join("");
            }

            for (var i = 0; i < ps.length; ++i) {
                pattern = pattern.replace(new RegExp("\\{" + i + "\\}", "gm"), ps[i]);
            }

            return pattern;
        }
        u.format = format;

        function empty(str) {
            return (!valid(str) || str.length === 0);
        }
        u.empty = empty;

        function valid(obj) {
            return (obj !== null && obj !== undefined && typeof (obj) !== "undefined");
        }
        u.valid = valid;
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

        function show(elem, show) {
            if (typeof show === "undefined") { show = true; }
            elem.style.display = show ? "block" : "none";
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
    var Selection = (function () {
        function Selection(target, overlay) {
            this.target = target;
            this.overlay = overlay;
        }
        return Selection;
    })();
    ;

    var ClickMode = (function () {
        function ClickMode() {
            var _this = this;
            // pointer-events:none;
            this.greyoutPattern = 'position:fixed;z-index:99999;background-color:grey;border:1px solid red;opacity:0.6;filter:alpha(opacity=60);top:{0}px;left:{1}px;width:{2}px;height:{3}px';
            this.selections = [];
            this.overlays = [];
            this.moflag = true;
            this.mouseOver = function (e) {
                if (!_this.moflag) {
                    return;
                }

                _this.moflag = false;
                ClipWall.g.st(function () {
                    _this.moflag = true;
                }, 200);
                _this.overTarget(ClipWall.u.evt(e).target);
                ClipWall.u.stop(e);
            };

            this.mouseClick = function (e) {
                _this.clickOverlay(ClipWall.u.evt(e).target);
                ClipWall.u.stop(e);
            };

            this.scroll = function () {
                _this.updateSelections();
            };
        }
        ClickMode.prototype.apply = function () {
            this.xoffset = ClipWall.g.w.pageXOffset;
            this.yoffset = ClipWall.g.w.pageYOffset;
            this.hook(true);
        };

        ClickMode.prototype.dispose = function () {
            this.hook(false);
        };

        ClickMode.prototype.hook = function (bind) {
            var handle = bind ? ClipWall.e.be : ClipWall.e.ue;
            handle(ClipWall.g.b, "mouseover", this.mouseOver);
            handle(ClipWall.g.w, "scroll", this.scroll);
        };

        // if parameter is empty, create full screen to cover document
        ClickMode.prototype.greyout = function (under) {
            var s = ClipWall.g.ce('div');
            if (!ClipWall.u.valid(under)) {
                ClipWall.g.at(s, 'class', 'greyout');
            } else {
                var rect = under.getBoundingClientRect();
                ClipWall.g.at(s, 'style', ClipWall.u.format(this.greyoutPattern, rect.top.toString(), rect.left.toString(), rect.width.toString(), rect.height.toString()));
            }

            ClipWall.g.b.appendChild(s);
            this.overlays.push(s);
            ClipWall.e.be(s, "click", this.mouseClick);
            return s;
        };

        ClickMode.prototype.selected = function (elem) {
            for (var i = 0; i < this.selections.length; i++) {
                if (this.selections[i].target === elem || this.selections[i].overlay === elem) {
                    return i;
                }
            }

            return -1;
        };

        ClickMode.prototype.overTarget = function (target) {
            if (target == ClipWall.g.b || this.overlays.indexOf(target) != -1 || ClipWall.u.empty(target.innerText) || this.onlyDivChildren(target)) {
                this.removeLastIfNotSelected();
                return;
            }

            if (!ClipWall.u.valid(this.lastFocus)) {
                this.lastFocus = new Selection(target, this.greyout(target));
                return;
            }

            if (target != this.lastFocus.target) {
                this.removeLastIfNotSelected();

                if (this.selected(target) === -1) {
                    this.lastFocus = new Selection(target, this.greyout(target));
                }
            }
        };

        ClickMode.prototype.findchild = function (target) {
            for (var i = 0; i < this.selections.length; i++) {
                if (ClipWall.u.contains(target, this.selections[i].target)) {
                    return i;
                }
            }

            return -1;
        };

        ClickMode.prototype.clickOverlay = function (overlay) {
            var idx = this.selected(overlay);
            if (idx == -1) {
                if (this.lastFocus && this.lastFocus.overlay == overlay) {
                    var child = this.findchild(this.lastFocus.target);
                    if (child != -1) {
                        this.removeSelection(child);
                    }

                    this.selections.push(this.lastFocus);
                }
            } else {
                this.removeSelection(idx);
            }
        };

        ClickMode.prototype.removeLastIfNotSelected = function () {
            if (this.lastFocus && this.selected(this.lastFocus.target) === -1) {
                this.removeChild(this.lastFocus.overlay);
            }
        };

        ClickMode.prototype.removeSelection = function (index) {
            this.removeChild(this.selections[index].overlay);
            this.selections.splice(index, 1);
        };

        ClickMode.prototype.removeChild = function (elem) {
            for (var i = 0; i < this.overlays.length; i++) {
                if (this.overlays[i] == elem) {
                    this.overlays.splice(i, 1);
                    ClipWall.g.b.removeChild(elem);
                    return;
                }
            }
        };

        ClickMode.prototype.updateSelections = function () {
            this.removeLastIfNotSelected();
            var x = pageXOffset - this.xoffset;
            var y = pageYOffset - this.yoffset;
            this.xoffset = pageXOffset;
            this.yoffset = pageYOffset;
            for (var i = 0; i < this.selections.length; i++) {
                var elem = this.selections[i].overlay;
                elem.style.top = (parseInt(elem.style.top) - y) + 'px';
                elem.style.left = (parseInt(elem.style.left) - x) + 'px';
            }
        };

        ClickMode.prototype.onlyDivChildren = function (elem) {
            if (elem.childElementCount == 0) {
                return false;
            }

            if (elem.childElementCount > 10) {
                return true;
            }

            for (var i = 0; i < elem.children.length; i++) {
                if (elem.children.item(i).tagName !== "DIV") {
                    return false;
                }
            }

            return true;
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
