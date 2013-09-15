/// <reference path="clip.ts" />
/// <reference path="../lib/selection.ts" />

module ClipWall {
    export class SelectMode implements IClipMode {
        private selection: Selection;
        constructor() {
        }

        public apply(): void {
            this.selection.enable(true);
        }

        public dispose(): void {
            this.selection.enable(false);
        }
    }
}