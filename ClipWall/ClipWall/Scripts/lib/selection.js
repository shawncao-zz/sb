/// <reference path="utils.ts" />
var ClipWall;
(function (ClipWall) {
    var Selection = (function () {
        function Selection(start, selecting, selected) {
            var _this = this;
            this.onstart = start;
            this.onselecting = selecting;
            this.onselected = selected;

            this.mouseDown = function (e) {
                _this._target = ClipWall.u.evt(e).target;
                _this._position = ClipWall.Point.from(e);
                if (_this._flag === 0) {
                    _this._flag = 1;
                    ClipWall.u.stop(e);
                }

                if (ClipWall.u.valid(_this.onstart)) {
                    _this.onstart(_this);
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
                    _this.onselecting(_this);
                }

                ClipWall.u.stop(e);
            };

            this.mouseUp = function (e) {
                _this._flag = 0;
                if (ClipWall.u.valid(_this.onselected)) {
                    _this.onselected(_this);
                }

                _this._target = null;

                ClipWall.u.stop(e);
            };
        }
        Object.defineProperty(Selection.prototype, "target", {
            get: function () {
                return this._target;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Selection.prototype, "position", {
            get: function () {
                return this._position;
            },
            enumerable: true,
            configurable: true
        });

        Selection.prototype.enable = function (bind) {
            var handle = bind ? ClipWall.e.be : ClipWall.e.ue;
            handle(ClipWall.g.b, "mousedown", this.mouseDown);
            handle(ClipWall.g.b, "mousemove", this.mouseMove);
            handle(ClipWall.g.b, "mouseup", this.mouseUp);
            ClipWall.u.mouseselect(ClipWall.g.b, bind);
        };
        return Selection;
    })();
    ClipWall.Selection = Selection;
})(ClipWall || (ClipWall = {}));
