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
