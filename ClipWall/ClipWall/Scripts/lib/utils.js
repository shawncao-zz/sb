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
