var ClipWall;
(function (ClipWall) {
    var Panel = (function () {
        function Panel() {
            this.modes = [];
            var p = ClipWall.g.ce('div');
            ClipWall.g.at(p, 'class', 'panel');
            p.innerHTML = "Here will be menu for modes selection and content<div id='cnt'></div>";
            ClipWall.g.b.insertBefore(p, ClipWall.g.b.firstChild);
            ClipWall.e.bind("addcontent", function (text) {
                ClipWall.g.ge("cnt").innerHTML += "<br/>" + text;
            });
        }
        Panel.CreatePanel = function () {
            return new Panel();
        };
        return Panel;
    })();
    ClipWall.Panel = Panel;
})(ClipWall || (ClipWall = {}));
