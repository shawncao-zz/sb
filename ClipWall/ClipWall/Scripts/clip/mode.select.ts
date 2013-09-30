/// <reference path="clip.ts" />
/// <reference path="../lib/scrape.ts" />

module ClipWall {
    export class SelectMode implements IClipMode {
        private scrape: Scrape;
        constructor() {
            this.scrape = new Scrape(
                (scrape: Scrape) => false,
                (scrape: Scrape) => false,
                () => {
                    this.detectSelection();
                    return false;
                });
        }

        public apply(): void {
            this.scrape.enable(true);
        }

        public dispose(): void {
            this.scrape.enable(false);
        }

        private detectSelection() {
            var text = this.selectedText();
            e.fire("addcontent", text);
            this.highlight('yellow');
        }

        private makeEditableAndHighlight(color): void {
            var sel = g.w.getSelection();
            g.d.designMode = "on";
            if (sel.rangeCount && sel.getRangeAt) {
                var range = sel.getRangeAt(0);
                sel.removeAllRanges();
                sel.addRange(range);
            }

            // Use HiliteColor since some browsers apply BackColor to the whole block
            if (!g.d.execCommand("HiliteColor", false, color)) {
                g.d.execCommand("BackColor", false, color);
            }
            g.d.designMode = "off";
        }

        private highlight(color): void {
            if (g.w.getSelection) {
                // IE9 and non-IE
                try {
                    if (!document.execCommand("BackColor", false, color)) {
                        this.makeEditableAndHighlight(color);
                    }
                } catch (ex) {
                    this.makeEditableAndHighlight(color);
                }
            } else if (g.d.selection && g.d.selection.createRange) {
                // IE <= 8 case
                var range = g.d.selection.createRange();
                range.execCommand("BackColor", false, color);
            }
        }

        private selectedText(): string {
            if (g.w.getSelection) {  // all browsers, except IE before version 9
                var sel = g.w.getSelection();
                if (sel.rangeCount && sel.getRangeAt) {
                    return sel.getRangeAt(0).toString();
                }
            }
            else if (g.d.selection.createRange) { // Internet Explorer
                return g.d.selection.createRange().text;
            }

            return '';
        }
    }
}