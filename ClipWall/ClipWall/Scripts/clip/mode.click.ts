/// <reference path="clip.ts" />
/// <reference path="mode.share.ts" />
/// <reference path="../lib/page.ts" />
/// <reference path="../lib/utils.ts" />
/// <reference path="../lib/coll.ts" />
/// <reference path="../lib/point.ts" />

module ClipWall {
    export class ClickMode implements IClipMode {

        // key is the overlay
        private lastFocus: c.KeyValuePair<HTMLElement, HTMLElement>;
        private selections: c.IDictionary<HTMLElement, HTMLElement> = new c.Dictionary();
        private overlays: c.IList<HTMLElement> = new c.List();

        private mouseOver: (e) => any;
        private mouseClick: (e) => any;
        private scroll: () => any;

        private moflag: boolean = true;
        private initOffset: Point;

        constructor(private panel: HTMLElement) {
            this.mouseOver = (e) => {
                if (!this.moflag) {
                    return;
                }

                this.moflag = false;
                g.st(() => { this.moflag = true; }, 300);

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
            this.initOffset = new Point(g.w.pageXOffset, g.w.pageYOffset);
            this.hook(true);
        }

        public dispose(): void {
            this.hook(false);
        }

        private hook(bind: boolean) {
            var handle = bind ? e.be : e.ue;
            handle(g.b, "mouseover", this.mouseOver);
            handle(g.w, "scroll", this.scroll);
            u.mouseselect(g.b, bind);
        }

        private overTarget(target: HTMLElement): void {
            // keep last focus
            if (this.lastFocus && u.contains(this.lastFocus.value, target)) {
                return;
            }

            if (g.b.clientWidth <= (target.clientWidth + 10)
                || g.b.clientHeight <= (target.clientHeight + 10)
                || u.empty(target.innerText)
                || this.onlyDivChildren(target)) {
                this.removeLastIfNotSelected();
                return;
            }

            if (!u.valid(this.lastFocus)) {
                this.lastFocus = new c.KeyValuePair(this.greyout(target), target);
                return;
            }

            if (target != this.lastFocus.value) {
                this.removeLastIfNotSelected();

                if (!this.selections.containsValue(target)) {
                    this.lastFocus = new c.KeyValuePair(this.greyout(target), target);
                }
            }
        }

        private greyout(target: HTMLElement): HTMLElement {
            var s = createOverlay(target);
            this.overlays.add(s);
            e.be(s, "click", this.mouseClick);
            return s;
        }

        private clickOverlay(overlay: HTMLElement): void {
            if (!this.selections.containsKey(overlay)) {
                if (this.lastFocus && this.lastFocus.key == overlay) {
                    this.removeChildren(this.lastFocus.value);
                    this.selections.add(this.lastFocus.key, this.lastFocus.value);
                }
            } else {
                this.removeSelection(overlay);
            }
        }

        private removeLastIfNotSelected(): void {
            if (u.valid(this.lastFocus) && !this.selections.containsKey(this.lastFocus.key)) {
                this.removeElement(this.lastFocus.key);
                this.lastFocus = null;
            }
        }

        private removeChildren(elem: HTMLElement): void {
            for (var i = this.selections.count - 1; i >= 0; i--) {
                var pair = this.selections.pair(i);
                if (u.contains(elem, pair.value)) {
                    this.removeSelection(pair.key);
                }
            }
        }

        private removeSelection(elem: HTMLElement) {
            this.selections.remove(elem);
            this.removeElement(elem);
        }

        private removeElement(elem: HTMLElement) {
            var idx = this.overlays.indexOf(elem);
            if (idx !== -1) {
                this.overlays.removeAt(idx);
                g.b.removeChild(elem);
            }
        }

        private updateSelections(): void {
            this.removeLastIfNotSelected();
            var newPoint = new Point(pageXOffset, pageYOffset);
            var gap = newPoint.substract(this.initOffset);
            this.initOffset = newPoint;

            for (var i = 0; i < this.selections.count; i++) {
                updateOverlay(this.selections.pair(i).key, -gap.x, -gap.y, 0, 0);
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

