var ClipWall;
(function (ClipWall) {
    var Panel = (function () {
        function Panel() {
            this.modes = [];
            this.mLeft = ['0', '-300px'];
            this.mIndex = 0;
            this.panel = ClipWall.g.ce('div');
            ClipWall.g.sat(this.panel, 'class', 'panel');
            this.panel.innerHTML = "<div id='cnt' class='left'></div>" + "<div class='right'>" + "<ul>" + "<li class='b_expand' onclick='panel.menuClick(this);' />" + "<li class='b_pick' onclick='panel.menuClick(this);' />" + "<li class='b_select' onclick='panel.menuClick(this);' />" + "<li class='b_login' onclick='panel.menuClick(this);' />" + "</ul>" + "</div>";

            ClipWall.g.b.insertBefore(this.panel, ClipWall.g.b.firstChild);
            ClipWall.e.bind("addcontent", function (args) {
                ClipWall.g.ge("cnt").innerHTML += "<br/>" + args[0];
            });

            // create default mode
            this.createMode();
        }
        Panel.CreatePanel = function () {
            return new Panel();
        };

        Panel.prototype.createMode = function () {
            // use one clip mode for default
            var mode = new ClipWall.SelectMode(this.panel);
            mode.apply();
            this.modes.push(mode);

            // other modes push to the collection
            this.modes.push(new ClipWall.ClickMode(this.panel));
        };

        Panel.prototype.menuClick = function (item) {
            switch (item.className) {
                case "b_expand":
                    this.clickExpand();
                    break;
                case "b_pick":
                    this.clickPickMode();
                    break;
                case "b_select":
                    this.clickSelectMode();
                    break;
                case "b_login":
                    this.clickLogin();
                    break;
            }
        };

        Panel.prototype.clickExpand = function () {
            this.panel.style.marginLeft = this.mLeft[this.mIndex];
            this.mIndex = (this.mIndex + 1) % this.mLeft.length;
        };

        Panel.prototype.clickPickMode = function () {
            var mode = this.getMode(ClipWall.ClickMode.Name);
            if (mode == null) {
                throw new Error('this mode is not supported');
            }

            this.disposeAll();
            mode.apply();
        };

        Panel.prototype.clickSelectMode = function () {
            var mode = this.getMode(ClipWall.SelectMode.Name);
            if (mode == null) {
                throw new Error('this mode is not supported');
            }

            this.disposeAll();
            mode.apply();
        };

        Panel.prototype.clickLogin = function () {
        };

        Panel.prototype.getMode = function (name) {
            for (var i = 0; i < this.modes.length; ++i) {
                if (this.modes[i].name === name) {
                    return this.modes[i];
                }
            }

            return null;
        };

        Panel.prototype.disposeAll = function () {
            for (var i = 0; i < this.modes.length; ++i) {
                this.modes[i].dispose();
            }
        };
        return Panel;
    })();
    ClipWall.Panel = Panel;
})(ClipWall || (ClipWall = {}));
