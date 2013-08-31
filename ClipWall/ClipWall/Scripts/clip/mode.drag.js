/// <reference path="mode.share.ts" />
/// <reference path="../lib/page.ts" />
/// <reference path="../lib/utils.ts" />
var ClipWall;
(function (ClipWall) {
    var DragMode = (function () {
        function DragMode() {
            var _this = this;
            this.overlays = new ClipWall.c.List();
            this.dragFlag = 0;
            this.dragTarget = null;
            this.mouseDown = function (e) {
                _this.dragTarget = ClipWall.u.evt(e).target;
                _this.lastPosition = ClipWall.Point.from(e);
                if (_this.dragFlag === 0) {
                    _this.dragFlag = 1;
                    ClipWall.u.stop(e);
                }
            };

            this.mouseMove = function (e) {
                if (_this.dragFlag == 0) {
                    return;
                }

                var newP = ClipWall.Point.from(e);
                var gap = newP.substract(_this.lastPosition);
                if (_this.dragFlag == 1) {
                    _this.dragFlag = 2;
                    _this.dragTarget = ClipWall.createOverlay(null);
                    ClipWall.updateOverlay(_this.dragTarget, _this.lastPosition.x, _this.lastPosition.y, gap.x, gap.y);
                    console.log("x:" + gap.x + ";y:" + gap.y);
                } else if (_this.dragTarget) {
                    ClipWall.updateOverlay(_this.dragTarget, 0, 0, gap.x, gap.y);
                    console.log("w:" + gap.x + ";h:" + gap.y);
                }

                _this.lastPosition = newP;

                ClipWall.u.stop(e);
            };

            this.mouseUp = function (e) {
                _this.dragFlag = 0;
                if (_this.dragTarget) {
                    _this.clearOverlap(_this.dragTarget.getBoundingClientRect());
                    _this.overlays.add(_this.dragTarget);
                    _this.dragTarget = null;
                }

                ClipWall.u.stop(e);
            };
        }
        DragMode.prototype.apply = function () {
            this.hook(true);
        };

        DragMode.prototype.dispose = function () {
            this.hook(false);
        };

        DragMode.prototype.hook = function (bind) {
            var handle = bind ? ClipWall.e.be : ClipWall.e.ue;
            handle(ClipWall.g.b, "mousedown", this.mouseDown);
            handle(ClipWall.g.b, "mousemove", this.mouseMove);
            handle(ClipWall.g.b, "mouseup", this.mouseUp);
            ClipWall.u.mouseselect(ClipWall.g.b, bind);
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
