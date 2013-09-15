/// <reference path="mode.share.ts" />
/// <reference path="../lib/page.ts" />
/// <reference path="../lib/selection.ts" />
/// <reference path="../lib/utils.ts" />

module ClipWall {
    export class DragMode implements IClipMode {
        private overlays: c.IList<HTMLElement> = new c.List();
        private selection: Selection;
        // mouse drag
        private lastPosition: Point;
        private dragTarget: HTMLElement;

        constructor() {
            this.selection = new Selection(
                (selection: Selection) => {
                    this.lastPosition = selection.position;
                },

                (selection: Selection) => {
                    var newP = selection.position;
                    if (!u.valid(this.lastPosition)) {
                        this.lastPosition = newP;
                        return;
                    }

                    var gap = newP.substract(this.lastPosition);
                    if (!u.valid(this.dragTarget)) {
                        this.dragTarget = createOverlay(null);
                        updateOverlay(this.dragTarget, this.lastPosition.x, this.lastPosition.y, gap.x, gap.y);
                    } else {
                        updateOverlay(this.dragTarget, 0, 0, gap.x, gap.y);
                    }

                    this.lastPosition = newP;
                },

                () => {
                    if (u.valid(this.dragTarget)) {
                        this.clearOverlap(this.dragTarget.getBoundingClientRect());
                        this.overlays.add(this.dragTarget);
                        this.dragTarget = null;
                    }
                });
        }

        public apply(): void {
            this.selection.enable(true);
        }

        public dispose(): void {
            this.selection.enable(false);
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