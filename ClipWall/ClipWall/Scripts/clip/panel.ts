
module ClipWall {
    export class Panel {
        private modes: IClipMode[] = [];
        private panel: HTMLElement;
        private mLeft: string[] = ['0', '-300px'];
        private mIndex = 0;
        public static CreatePanel(): Panel {
            return new Panel();
        }

        constructor() {
            this.panel = g.ce('div');
            g.sat(this.panel, 'class', 'panel');
            this.panel.innerHTML = "<div id='cnt' class='left'></div>"
            + "<div class='right'>"
            + "<ul>"
            + "<li class='b_expand' onclick='panel.menuClick(this);' />"
            + "<li class='b_pick' onclick='panel.menuClick(this);' />"
            + "<li class='b_select' onclick='panel.menuClick(this);' />"
            + "<li class='b_login' onclick='panel.menuClick(this);' />"
            + "</ul>"
            + "</div>";

            g.b.insertBefore(this.panel, g.b.firstChild);
            e.bind("addcontent", (args) => {
                g.ge("cnt").innerHTML += "<br/>" + args[0];
            });

            // create default mode
            this.createMode();
        }

        private createMode() {
            // use one clip mode for default
            var mode: IClipMode = new ClipWall.SelectMode(this.panel);
            mode.apply();
            this.modes.push(mode);

            // other modes push to the collection
            this.modes.push(new ClipWall.ClickMode(this.panel));
        }

        private menuClick(item: HTMLElement) {
            switch (item.className) {
                case "b_expand": this.clickExpand(); break;
                case "b_pick": this.clickPickMode(); break;
                case "b_select": this.clickSelectMode(); break;
                case "b_login": this.clickLogin(); break;
            }
        }

        private clickExpand(): void {
            this.panel.style.marginLeft = this.mLeft[this.mIndex];
            this.mIndex = (this.mIndex + 1) % this.mLeft.length;
        }

        private clickPickMode(): void {
            var mode = this.getMode(ClickMode.Name);
            if (mode == null) {
                throw new Error('this mode is not supported');
            }

            this.disposeAll();
            mode.apply();
        }

        private clickSelectMode(): void {
            var mode = this.getMode(SelectMode.Name);
            if (mode == null) {
                throw new Error('this mode is not supported');
            }

            this.disposeAll();
            mode.apply();
        }

        private clickLogin(): void {
        }

        private getMode(name: string): IClipMode {
            for (var i = 0; i < this.modes.length; ++i) {
                if (this.modes[i].name === name) {
                    return this.modes[i];
                }
            }

            return null;
        }

        private disposeAll(): void {
            for (var i = 0; i < this.modes.length; ++i) {
                this.modes[i].dispose();
            }
        }
    }
}