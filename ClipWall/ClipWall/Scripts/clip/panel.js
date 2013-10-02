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
