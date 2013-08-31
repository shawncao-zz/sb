/// <reference path="mode.share.ts" />
/// <reference path="../lib/page.ts" />
/// <reference path="../lib/utils.ts" />


module ClipWall {
    export class DragMode implements IClipMode {
        private mouseDown: (e) => any;
        private mouseUp: (e) => any;
        private mouseMove: (e) => any;
        private overlays: c.IList<HTMLElement> = new c.List();

        // mouse drag
        private lastPosition: Point;
        private dragFlag: number = 0;
        private dragTarget: HTMLElement = null;

        constructor() {
            this.mouseDown = (e) => {
                this.dragTarget = <HTMLElement>u.evt(e).target;
                this.lastPosition = Point.from(<MouseEvent>e);
                if (this.dragFlag === 0) {
                    this.dragFlag = 1;
                    u.stop(e);
                }
            };

            this.mouseMove = (e) => {
                if (this.dragFlag == 0) {
                    return;
                }

                var newP = Point.from(<MouseEvent>e);
                var gap = newP.substract(this.lastPosition);
                if (this.dragFlag == 1) {
                    this.dragFlag = 2;
                    this.dragTarget = createOverlay(null);
                    updateOverlay(this.dragTarget, this.lastPosition.x, this.lastPosition.y, gap.x, gap.y);
                    console.log("x:" + gap.x + ";y:" + gap.y);
                } else if (this.dragTarget) {
                    updateOverlay(this.dragTarget, 0, 0, gap.x, gap.y);
                    console.log("w:" + gap.x + ";h:" + gap.y);
                }

                this.lastPosition = newP;

                u.stop(e);
            };

            this.mouseUp = (e) => {
                this.dragFlag = 0;
                if (this.dragTarget) {
                    this.clearOverlap(this.dragTarget.getBoundingClientRect());
                    this.overlays.add(this.dragTarget);
                    this.dragTarget = null;
                }

                u.stop(e);
            };
        }

        public apply(): void {
            this.hook(true);
        }

        public dispose(): void {
            this.hook(false);
        }

        private hook(bind: boolean) {
            var handle = bind ? e.be : e.ue;
            handle(g.b, "mousedown", this.mouseDown);
            handle(g.b, "mousemove", this.mouseMove);
            handle(g.b, "mouseup", this.mouseUp);
            u.mouseselect(g.b, bind);
        }

        private clearOverlap(rect: ClientRect) {
            for (var i = this.overlays.count - 1; i >= 0; i--) {
                if (this.overlap(rect, this.overlays.item(i).getBoundingClientRect())) {
                    g.b.removeChild(this.overlays.item(i));
                    this.overlays.removeAt(i);
                }
            }
        }

        private overlap(rect1: ClientRect, rect2: ClientRect): boolean {
            return true;
        }
    }
}