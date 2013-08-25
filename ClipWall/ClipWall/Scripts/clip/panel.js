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
