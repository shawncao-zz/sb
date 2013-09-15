/// <reference path="clip.ts" />
/// <reference path="../lib/selection.ts" />
var ClipWall;
(function (ClipWall) {
    var SelectMode = (function () {
        function SelectMode() {
        }
        SelectMode.prototype.apply = function () {
            this.selection.enable(true);
        };

        SelectMode.prototype.dispose = function () {
            this.selection.enable(false);
        };
        return SelectMode;
    })();
    ClipWall.SelectMode = SelectMode;
})(ClipWall || (ClipWall = {}));
