/// <reference path="clip.ts" />
/// <reference path="../lib/page.ts" />
/// <reference path="../lib/utils.ts" />

module ClipWall {
    class Selection {
        constructor(public target: HTMLElement, public overlay: HTMLElement) { }
    };

    export class ClickMode implements IClipMode {
        // pointer-events:none;
        private greyoutPattern: string = 'position:fixed;z-index:99999;background-color:grey;border:1px solid red;opacity:0.6;filter:alpha(opacity=60);top:{0}px;left:{1}px;width:{2}px;height:{3}px';
        private lastFocus: Selection;
        private selections: Selection[] = [];
        private overlays: HTMLElement[] = [];

        private mouseOver: (e) => any;
        private mouseClick: (e) => any;
        private scroll: () => any;

        private moflag: boolean = true;

        private xoffset: number;
        private yoffset: number;

        constructor() {
            this.mouseOver = (e) => {
                if (!this.moflag) {
                    return;
                }

                this.moflag = false;
                g.st(() => { this.moflag = true; }, 200);
                this.overTarget(<HTMLElement>u.evt(e).target);
                u.stop(e);
            };

            this.mouseClick = (e) => {
                this.clickOverlay(<HTMLElement>u.evt(e).target);
                u.stop(e);
            };

            this.scroll = () => {
                this.updateSelections();
            };
        }

        public apply(): void {
            this.xoffset = g.w.pageXOffset;
            this.yoffset = g.w.pageYOffset;
            this.hook(true);
        }

        public dispose(): void {
            this.hook(false);
        }

        private hook(bind: boolean) {
            var handle = bind ? e.be : e.ue;
            handle(g.b, "mouseover", this.mouseOver);
            handle(g.w, "scroll", this.scroll);
        }

        // if parameter is empty, create full screen to cover document
        private greyout(under?: HTMLElement): HTMLElement {
            var s = g.ce('div');
            if (!u.valid(under)) {
                g.at(s, 'class', 'greyout');
            } else {
                var rect = under.getBoundingClientRect();
                g.at(s, 'style', u.format(
                    this.greyoutPattern,
                    rect.top.toString(),
                    rect.left.toString(),
                    rect.width.toString(),
                    rect.height.toString()));
            }


            g.b.appendChild(s);
            this.overlays.push(s);
            e.be(s, "click", this.mouseClick);
            return s;
        }

        private selected(elem: HTMLElement): number {
            for (var i = 0; i < this.selections.length; i++) {
                if (this.selections[i].target === elem || this.selections[i].overlay === elem) {
                    return i;
                }
            }

            return -1;
        }

        private overTarget(target: HTMLElement): void {
            if (target == g.b
                || this.overlays.indexOf(target) != -1
                || u.empty(target.innerText)
                || this.onlyDivChildren(target)) {
                this.removeLastIfNotSelected();
                return;
            }

            if (!u.valid(this.lastFocus)) {
                this.lastFocus = new Selection(target, this.greyout(target));
                return;
            }

            if (target != this.lastFocus.target) {
                this.removeLastIfNotSelected();

                if (this.selected(target) === -1) {
                    this.lastFocus = new Selection(target, this.greyout(target));
                }
            }
        }

        private findchild(target: HTMLElement): number {
            for (var i = 0; i < this.selections.length; i++) {
                if (u.contains(target, this.selections[i].target)) {
                    return i;
                }
            }

            return -1;
        }

        private clickOverlay(overlay: HTMLElement): void {
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
        }

        private removeLastIfNotSelected(): void {
            if (this.lastFocus && this.selected(this.lastFocus.target) === -1) {
                this.removeChild(this.lastFocus.overlay);
            }
        }

        private removeSelection(index: number): void {
            this.removeChild(this.selections[index].overlay);
            this.selections.splice(index, 1);
        }

        private removeChild(elem: HTMLElement): void {
            for (var i = 0; i < this.overlays.length; i++) {
                if (this.overlays[i] == elem) {
                    this.overlays.splice(i, 1);
                    g.b.removeChild(elem);
                    return;
                }
            }
        }

        private updateSelections(): void {
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
        }

        private onlyDivChildren(elem: HTMLElement): boolean {
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
        }
    }
}

