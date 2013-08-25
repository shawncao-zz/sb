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
