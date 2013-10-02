var ClipWall;
(function (ClipWall) {
    // define global variables
    (function (g) {
        g.d = document;
        g.w = window;
        g.b = (g.d.body || g.gt('body')[0]);
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
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var handlers = cache[e];
            if (handlers) {
                for (var i = 0; i < handlers.length; i++) {
                    handlers[i](args);
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
            return (obj !== null && typeof obj !== "undefined");
        }
        u.valid = valid;

        function mouseselect(target, disable) {
            if (typeof target.onselectstart != "undefined")
                target.onselectstart = disable ? function () {
                    return false;
                } : null;
else if (typeof target.style.MozUserSelect != "undefined")
                target.style.MozUserSelect = disable ? "none" : null;
        }
        u.mouseselect = mouseselect;
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
        function Panel() {
            this.modes = [];
            var p = ClipWall.g.ce('div');
            ClipWall.g.at(p, 'class', 'panel');
            p.innerHTML = "<div id='cnt' class='left'></div>" + "<div class='right'>" + "<ul>" + "<li class='b_expand' />" + "<li class='b_pick' />" + "<li class='b_select' />" + "<li class='b_login' />" + "</ul>" + "</div>";

            ClipWall.g.b.insertBefore(p, ClipWall.g.b.firstChild);
            ClipWall.e.bind("addcontent", function (args) {
                ClipWall.g.ge("cnt").innerHTML += "<br/>" + args[0];
            });

            // create default mode
            this.createMode(p);
        }
        Panel.CreatePanel = function () {
            return new Panel();
        };

        Panel.prototype.createMode = function (panel) {
            // use one clip mode for default
            var mode = new ClipWall.SelectMode(panel);
            mode.apply();
            this.modes.push(mode);
        };
        return Panel;
    })();
    ClipWall.Panel = Panel;
})(ClipWall || (ClipWall = {}));
var ClipWall;
(function (ClipWall) {
    // pointer-events:none;
    var greyoutPattern = 'top:{0}px;left:{1}px;width:{2}px;height:{3}px';

    // if parameter is empty, create full screen to cover document
    function createOverlay(under) {
        var s = ClipWall.g.ce('div');
        if (under === ClipWall.g.b) {
            ClipWall.g.at(s, 'class', 'greyout');
        } else {
            var rect = { top: 0, left: 0, width: 0, height: 0 };
            if (ClipWall.u.valid(under)) {
                rect = under.getBoundingClientRect();
            }
            ClipWall.g.at(s, 'class', 'overlay');
            ClipWall.g.at(s, 'style', ClipWall.u.format(greyoutPattern, rect.top.toString(), rect.left.toString(), rect.width.toString(), rect.height.toString()));
            //s.innerHTML = "<p>drag to expand it...</p>";
        }

        ClipWall.g.b.appendChild(s);
        return s;
    }
    ClipWall.createOverlay = createOverlay;

    function updateOverlay(elem, x, y, w, h) {
        if (y !== 0)
            elem.style.top = (parseInt(elem.style.top) + y) + 'px';
        if (x !== 0)
            elem.style.left = (parseInt(elem.style.left) + x) + 'px';
        if (w !== 0)
            elem.style.width = (parseInt(elem.style.width) + w) + 'px';
        if (h !== 0)
            elem.style.height = (parseInt(elem.style.height) + h) + 'px';
    }
    ClipWall.updateOverlay = updateOverlay;
})(ClipWall || (ClipWall = {}));
// define some basic collections
var ClipWall;
(function (ClipWall) {
    (function (c) {
        var KeyValuePair = (function () {
            function KeyValuePair(key, value) {
                this.key = key;
                this.value = value;
            }
            return KeyValuePair;
        })();
        c.KeyValuePair = KeyValuePair;

        var List = (function () {
            function List() {
                this.data = [];
            }
            List.prototype.add = function (elem) {
                if (ClipWall.u.valid(elem)) {
                    this.data.push(elem);
                }
            };

            List.prototype.remove = function (elem) {
                var found = this.indexOf(elem);
                if (found != -1) {
                    this.removeAt(found);
                }
            };

            List.prototype.removeAt = function (i) {
                if (i >= 0 && i < this.count) {
                    this.data.splice(i, 1);
                }
            };

            List.prototype.item = function (i) {
                if (i >= 0 && i < this.count) {
                    return this.data[i];
                }

                return null;
            };

            List.prototype.indexOf = function (elem) {
                var found = -1;
                for (var i = 0; i < this.count; i++) {
                    if (elem === this.data[i]) {
                        found = i;
                        break;
                    }
                }

                return found;
            };

            Object.defineProperty(List.prototype, "count", {
                get: function () {
                    return this.data.length;
                },
                enumerable: true,
                configurable: true
            });
            return List;
        })();
        c.List = List;

        var Dictionary = (function () {
            function Dictionary() {
                this.keys = new List();
                this.values = new List();
            }
            Dictionary.prototype.add = function (key, value) {
                if (ClipWall.u.valid(key) && ClipWall.u.valid(value) && !this.containsKey(key)) {
                    this.keys.add(key);
                    this.values.add(value);
                }
            };

            Dictionary.prototype.containsKey = function (key) {
                if (ClipWall.u.valid(key)) {
                    return this.keys.indexOf(key) != -1;
                }

                return false;
            };

            Dictionary.prototype.containsValue = function (value) {
                if (ClipWall.u.valid(value)) {
                    return this.values.indexOf(value) != -1;
                }

                return false;
            };

            Dictionary.prototype.remove = function (key) {
                this.removeAt(this.keys.indexOf(key));
            };

            Dictionary.prototype.removeAt = function (index) {
                if (index >= 0 && index < this.count) {
                    this.keys.removeAt(index);
                    this.values.removeAt(index);
                }
            };

            Dictionary.prototype.pair = function (i) {
                if (i >= 0 && i < this.count) {
                    return new KeyValuePair(this.keys.item(i), this.values.item(i));
                }

                return null;
            };

            Object.defineProperty(Dictionary.prototype, "count", {
                get: function () {
                    return this.keys.count;
                },
                enumerable: true,
                configurable: true
            });
            return Dictionary;
        })();
        c.Dictionary = Dictionary;
    })(ClipWall.c || (ClipWall.c = {}));
    var c = ClipWall.c;
})(ClipWall || (ClipWall = {}));
var ClipWall;
(function (ClipWall) {
    var Point = (function () {
        function Point(x, y) {
            if (typeof x === "undefined") { x = 0; }
            if (typeof y === "undefined") { y = 0; }
            this.x = x;
            this.y = y;
        }
        Point.from = function (me) {
            return new Point(me.clientX, me.clientY);
        };
        Point.prototype.substract = function (p) {
            return new Point(this.x - p.x, this.y - p.y);
        };

        Point.prototype.dist = function (p) {
            var gap = this.substract(p);
            return Math.sqrt(gap.x * gap.x + gap.y * gap.y);
        };
        return Point;
    })();
    ClipWall.Point = Point;
})(ClipWall || (ClipWall = {}));
/// <reference path="clip.ts" />
/// <reference path="mode.share.ts" />
/// <reference path="../lib/page.ts" />
/// <reference path="../lib/utils.ts" />
/// <reference path="../lib/coll.ts" />
/// <reference path="../lib/point.ts" />
var ClipWall;
(function (ClipWall) {
    var ClickMode = (function () {
        function ClickMode(panel) {
            var _this = this;
            this.panel = panel;
            this.selections = new ClipWall.c.Dictionary();
            this.overlays = new ClipWall.c.List();
            this.moflag = true;
            this.mouseOver = function (e) {
                if (!_this.moflag) {
                    return;
                }

                _this.moflag = false;
                ClipWall.g.st(function () {
                    _this.moflag = true;
                }, 300);

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
            this.initOffset = new ClipWall.Point(ClipWall.g.w.pageXOffset, ClipWall.g.w.pageYOffset);
            this.hook(true);
        };

        ClickMode.prototype.dispose = function () {
            this.hook(false);
        };

        ClickMode.prototype.hook = function (bind) {
            var handle = bind ? ClipWall.e.be : ClipWall.e.ue;
            handle(ClipWall.g.b, "mouseover", this.mouseOver);
            handle(ClipWall.g.w, "scroll", this.scroll);
            ClipWall.u.mouseselect(ClipWall.g.b, bind);
        };

        ClickMode.prototype.overTarget = function (target) {
            if (this.lastFocus && ClipWall.u.contains(this.lastFocus.value, target)) {
                return;
            }

            if (ClipWall.g.b.clientWidth <= (target.clientWidth + 10) || ClipWall.g.b.clientHeight <= (target.clientHeight + 10) || ClipWall.u.empty(target.innerText) || this.onlyDivChildren(target)) {
                this.removeLastIfNotSelected();
                return;
            }

            if (!ClipWall.u.valid(this.lastFocus)) {
                this.lastFocus = new ClipWall.c.KeyValuePair(this.greyout(target), target);
                return;
            }

            if (target != this.lastFocus.value) {
                this.removeLastIfNotSelected();

                if (!this.selections.containsValue(target)) {
                    this.lastFocus = new ClipWall.c.KeyValuePair(this.greyout(target), target);
                }
            }
        };

        ClickMode.prototype.greyout = function (target) {
            var s = ClipWall.createOverlay(target);
            this.overlays.add(s);
            ClipWall.e.be(s, "click", this.mouseClick);
            return s;
        };

        ClickMode.prototype.clickOverlay = function (overlay) {
            if (!this.selections.containsKey(overlay)) {
                if (this.lastFocus && this.lastFocus.key == overlay) {
                    this.removeChildren(this.lastFocus.value);
                    this.selections.add(this.lastFocus.key, this.lastFocus.value);
                }
            } else {
                this.removeSelection(overlay);
            }
        };

        ClickMode.prototype.removeLastIfNotSelected = function () {
            if (ClipWall.u.valid(this.lastFocus) && !this.selections.containsKey(this.lastFocus.key)) {
                this.removeElement(this.lastFocus.key);
                this.lastFocus = null;
            }
        };

        ClickMode.prototype.removeChildren = function (elem) {
            for (var i = this.selections.count - 1; i >= 0; i--) {
                var pair = this.selections.pair(i);
                if (ClipWall.u.contains(elem, pair.value)) {
                    this.removeSelection(pair.key);
                }
            }
        };

        ClickMode.prototype.removeSelection = function (elem) {
            this.selections.remove(elem);
            this.removeElement(elem);
        };

        ClickMode.prototype.removeElement = function (elem) {
            var idx = this.overlays.indexOf(elem);
            if (idx !== -1) {
                this.overlays.removeAt(idx);
                ClipWall.g.b.removeChild(elem);
            }
        };

        ClickMode.prototype.updateSelections = function () {
            this.removeLastIfNotSelected();
            var newPoint = new ClipWall.Point(pageXOffset, pageYOffset);
            var gap = newPoint.substract(this.initOffset);
            this.initOffset = newPoint;

            for (var i = 0; i < this.selections.count; i++) {
                ClipWall.updateOverlay(this.selections.pair(i).key, -gap.x, -gap.y, 0, 0);
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
/// <reference path="utils.ts" />
var ClipWall;
(function (ClipWall) {
    var Scrape = (function () {
        function Scrape(start, selecting, selected) {
            var _this = this;
            this._flag = 0;
            this.onstart = start;
            this.onselecting = selecting;
            this.onselected = selected;

            this.mouseDown = function (e) {
                _this._target = ClipWall.u.evt(e).target;
                _this._position = ClipWall.Point.from(e);
                if (_this._flag === 0) {
                    _this._flag = 1;
                }

                if (ClipWall.u.valid(_this.onstart)) {
                    if (_this.onstart(_this)) {
                        ClipWall.u.stop(e);
                    }
                }
            };

            this.mouseMove = function (e) {
                if (_this._flag == 0) {
                    return;
                }

                _this._position = ClipWall.Point.from(e);
                if (_this._flag == 1) {
                    _this._flag = 2;
                }

                if (ClipWall.u.valid(_this.onselecting)) {
                    if (_this.onselecting(_this)) {
                        ClipWall.u.stop(e);
                    }
                }
            };

            this.mouseUp = function (e) {
                if (_this._flag != 2) {
                    return;
                }

                _this._flag = 0;
                if (ClipWall.u.valid(_this.onselected)) {
                    if (_this.onselected(_this)) {
                        ClipWall.u.stop(e);
                    }
                }

                _this._target = null;
            };
        }
        Object.defineProperty(Scrape.prototype, "target", {
            get: function () {
                return this._target;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Scrape.prototype, "position", {
            get: function () {
                return this._position;
            },
            enumerable: true,
            configurable: true
        });

        Scrape.prototype.enable = function (bind) {
            var handle = bind ? ClipWall.e.be : ClipWall.e.ue;
            handle(ClipWall.g.b, "mousedown", this.mouseDown);
            handle(ClipWall.g.b, "mousemove", this.mouseMove);
            handle(ClipWall.g.b, "mouseup", this.mouseUp);
        };
        return Scrape;
    })();
    ClipWall.Scrape = Scrape;
})(ClipWall || (ClipWall = {}));
/// <reference path="mode.share.ts" />
/// <reference path="../lib/page.ts" />
/// <reference path="../lib/scrape.ts" />
/// <reference path="../lib/utils.ts" />
var ClipWall;
(function (ClipWall) {
    var DragMode = (function () {
        function DragMode() {
            var _this = this;
            this.overlays = new ClipWall.c.List();
            this.selection = new ClipWall.Scrape(function (selection) {
                _this.lastPosition = selection.position;
                return true;
            }, function (selection) {
                var newP = selection.position;
                if (!ClipWall.u.valid(_this.lastPosition)) {
                    _this.lastPosition = newP;
                    return true;
                }

                var gap = newP.substract(_this.lastPosition);
                if (!ClipWall.u.valid(_this.dragTarget)) {
                    _this.dragTarget = ClipWall.createOverlay(null);
                    ClipWall.updateOverlay(_this.dragTarget, _this.lastPosition.x, _this.lastPosition.y, gap.x, gap.y);
                } else {
                    ClipWall.updateOverlay(_this.dragTarget, 0, 0, gap.x, gap.y);
                }

                _this.lastPosition = newP;
                return true;
            }, function () {
                if (ClipWall.u.valid(_this.dragTarget)) {
                    _this.clearOverlap(_this.dragTarget.getBoundingClientRect());
                    _this.overlays.add(_this.dragTarget);
                    _this.dragTarget = null;
                }

                return true;
            });
        }
        DragMode.prototype.apply = function () {
            this.selection.enable(true);
            ClipWall.u.mouseselect(ClipWall.g.b, true);
        };

        DragMode.prototype.dispose = function () {
            this.selection.enable(false);
            ClipWall.u.mouseselect(ClipWall.g.b, false);
        };

        DragMode.prototype.clearOverlap = function (rect) {
            for (var i = this.overlays.count - 1; i >= 0; i--) {
                if (this.overlap(rect, this.overlays.item(i).getBoundingClientRect())) {
                    ClipWall.g.b.removeChild(this.overlays.item(i));
                    this.overlays.removeAt(i);
                }
            }
        };

        DragMode.prototype.overlap = function (rect1, rect2) {
            return true;
        };
        return DragMode;
    })();
    ClipWall.DragMode = DragMode;
})(ClipWall || (ClipWall = {}));
/// <reference path="clip.ts" />
/// <reference path="../lib/scrape.ts" />
var ClipWall;
(function (ClipWall) {
    var SelectMode = (function () {
        function SelectMode(panel) {
            var _this = this;
            this.panel = panel;
            this.scrape = new ClipWall.Scrape(function (scrape) {
                return false;
            }, function (scrape) {
                return false;
            }, function () {
                _this.detectSelection();
                return false;
            });
        }
        SelectMode.prototype.apply = function () {
            this.scrape.enable(true);
        };

        SelectMode.prototype.dispose = function () {
            this.scrape.enable(false);
        };

        SelectMode.prototype.detectSelection = function () {
            if (!ClipWall.u.contains(this.panel, this.scrape.target)) {
                var text = this.selectedText();
                if (!ClipWall.u.empty(text)) {
                    ClipWall.e.fire("addcontent", text, this.scrape.target);
                    this.highlight('yellow');
                }
            }
        };

        SelectMode.prototype.makeEditableAndHighlight = function (color) {
            var sel = ClipWall.g.w.getSelection();
            ClipWall.g.d.designMode = "on";
            if (sel.rangeCount && sel.getRangeAt) {
                var range = sel.getRangeAt(0);
                sel.removeAllRanges();
                sel.addRange(range);
            }

            if (!ClipWall.g.d.execCommand("HiliteColor", false, color)) {
                ClipWall.g.d.execCommand("BackColor", false, color);
            }
            ClipWall.g.d.designMode = "off";
        };

        SelectMode.prototype.highlight = function (color) {
            if (ClipWall.g.w.getSelection) {
                try  {
                    if (!document.execCommand("BackColor", false, color)) {
                        this.makeEditableAndHighlight(color);
                    }
                } catch (ex) {
                    this.makeEditableAndHighlight(color);
                }
            } else if (ClipWall.g.d.selection && ClipWall.g.d.selection.createRange) {
                // IE <= 8 case
                var range = ClipWall.g.d.selection.createRange();
                range.execCommand("BackColor", false, color);
            }
        };

        SelectMode.prototype.selectedText = function () {
            if (ClipWall.g.w.getSelection) {
                var sel = ClipWall.g.w.getSelection();
                if (sel.rangeCount && sel.getRangeAt) {
                    return sel.getRangeAt(0).toString();
                }
            } else if (ClipWall.g.d.selection.createRange) {
                return ClipWall.g.d.selection.createRange().text;
            }

            return '';
        };
        return SelectMode;
    })();
    ClipWall.SelectMode = SelectMode;
})(ClipWall || (ClipWall = {}));
/// <reference path="../lib/page.ts" />
/// <reference path="../lib/utils.ts" />
/// <reference path="../lib/css.ts" />
/// <reference path="panel.ts" />
/// <reference path="mode.click.ts" />
/// <reference path="mode.drag.ts" />
/// <reference path="mode.select.ts" />
var loaded;

if (!loaded) {
    loaded = true;

    // load css file we need
    ClipWall.Css.load("clip");

    // create a panel
    ClipWall.Panel.CreatePanel();
}
