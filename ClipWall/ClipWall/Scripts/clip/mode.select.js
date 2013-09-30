/// <reference path="clip.ts" />
/// <reference path="../lib/scrape.ts" />
var ClipWall;
(function (ClipWall) {
    var SelectMode = (function () {
        function SelectMode() {
            var _this = this;
            this.scrape = new ClipWall.Scrape(function (scrape) {
                return false;
            }, function (scrape) {
                return false;
            }, function () {
                _this.detectSelection();
                return false;
            });
        }
        SelectMode.prototype.apply = function () {
            this.scrape.enable(true);
        };

        SelectMode.prototype.dispose = function () {
            this.scrape.enable(false);
        };

        SelectMode.prototype.detectSelection = function () {
            var text = this.selectedText();
            ClipWall.e.fire("addcontent", text);
            this.highlight('yellow');
        };

        SelectMode.prototype.makeEditableAndHighlight = function (color) {
            var sel = ClipWall.g.w.getSelection();
            ClipWall.g.d.designMode = "on";
            if (sel.rangeCount && sel.getRangeAt) {
                var range = sel.getRangeAt(0);
                sel.removeAllRanges();
                sel.addRange(range);
            }

            if (!ClipWall.g.d.execCommand("HiliteColor", false, color)) {
                ClipWall.g.d.execCommand("BackColor", false, color);
            }
            ClipWall.g.d.designMode = "off";
        };

        SelectMode.prototype.highlight = function (color) {
            if (ClipWall.g.w.getSelection) {
                try  {
                    if (!document.execCommand("BackColor", false, color)) {
                        this.makeEditableAndHighlight(color);
                    }
                } catch (ex) {
                    this.makeEditableAndHighlight(color);
                }
            } else if (ClipWall.g.d.selection && ClipWall.g.d.selection.createRange) {
                // IE <= 8 case
                var range = ClipWall.g.d.selection.createRange();
                range.execCommand("BackColor", false, color);
            }
        };

        SelectMode.prototype.selectedText = function () {
            if (ClipWall.g.w.getSelection) {
                var sel = ClipWall.g.w.getSelection();
                if (sel.rangeCount && sel.getRangeAt) {
                    return sel.getRangeAt(0).toString();
                }
            } else if (ClipWall.g.d.selection.createRange) {
                return ClipWall.g.d.selection.createRange().text;
            }

            return '';
        };
        return SelectMode;
    })();
    ClipWall.SelectMode = SelectMode;
})(ClipWall || (ClipWall = {}));
