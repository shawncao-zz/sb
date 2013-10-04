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
        Object.defineProperty(ClickMode.prototype, "name", {
            get: function () {
                return ClickMode.Name;
            },
            enumerable: true,
            configurable: true
        });

        ClickMode.prototype.apply = function () {
            this.initOffset = new ClipWall.Point(ClipWall.g.w.pageXOffset, ClipWall.g.w.pageYOffset);
            this.hook(true);
            ClipWall.e.be(ClipWall.g.w, "scroll", this.scroll);
        };

        ClickMode.prototype.dispose = function () {
            this.hook(false);
        };

        ClickMode.prototype.hook = function (bind) {
            var handle = bind ? ClipWall.e.be : ClipWall.e.ue;
            handle(ClipWall.g.b, "mouseover", this.mouseOver);
            ClipWall.u.mouseselect(ClipWall.g.b, bind);
        };

        ClickMode.prototype.overTarget = function (target) {
            if (this.lastFocus && ClipWall.u.contains(this.lastFocus.value, target)) {
                return;
            }

            if (this.excludeNode(target)) {
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
                    new ClipWall.Content(null, this.lastFocus.value).fireAdd();
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

        ClickMode.prototype.excludeNode = function (elem) {
            if (!ClipWall.u.valid(elem) || elem.tagName === "FORM" || elem.tagName === "INPUT" || elem.tagName === "SELECT") {
                return true;
            }

            if (elem.tagName === "IMG" || ClipWall.u.textNode(elem)) {
                return false;
            }

            if (ClipWall.u.eachKid(elem, this.excludeNode)) {
                return true;
            }

            return ClipWall.g.b.clientWidth <= elem.clientWidth * 2 || ClipWall.g.b.clientHeight <= elem.clientHeight * 2;
        };
        ClickMode.Name = "m_clk";
        return ClickMode;
    })();
    ClipWall.ClickMode = ClickMode;
})(ClipWall || (ClipWall = {}));
