module ClipWall {
    export class Panel {
        private modes: IClipMode[] = [];
        public static CreatePanel(): Panel {
            return new Panel();
        }

        constructor() {
            var p = g.ce('div');
            g.at(p, 'class', 'panel');
            p.innerHTML = "<div id='cnt' class='left'></div>"
            + "<div class='right'>"
            + "<ul>"
            + "<li class='b_expand' />"
            + "<li class='b_pick' />"
            + "<li class='b_select' />"
            + "<li class='b_login' />"
            + "</ul>"
            + "</div>";

            g.b.insertBefore(p, g.b.firstChild);
            e.bind("addcontent", (args) => {
                g.ge("cnt").innerHTML += "<br/>" + args[0];
            });

            // create default mode
            this.createMode(p);
        }

        private createMode(panel: HTMLElement) {
            // use one clip mode for default
            var mode: IClipMode = new ClipWall.SelectMode(panel);
            mode.apply();
            this.modes.push(mode);
        }
    }
}