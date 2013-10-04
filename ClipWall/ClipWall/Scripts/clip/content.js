var ClipWall;
(function (ClipWall) {
    var Content = (function () {
        function Content(text, dom) {
            if (typeof text === "undefined") { text = null; }
            if (typeof dom === "undefined") { dom = null; }
            this.text = text;
            this.dom = dom;
            this.id = Content.IdGen++;
        }
        Content.prototype.toString = function () {
            if (!ClipWall.u.empty(this.text)) {
                return this.text;
            }

            if (ClipWall.u.valid(this.dom)) {
                // strip styles to make it consistent display
                // before stripping, clone it to a new node
                this.strip(this.dom);

                if (this.dom.tagName == "IMG") {
                    return this.dom.outerHTML;
                } else {
                    return this.dom.innerHTML;
                }
            }

            return "";
        };

        Content.prototype.strip = function (elem) {
            elem.className = "";
            if (elem.style) {
                ClipWall.g.sat(elem, "style", "");
            }

            ClipWall.u.eachKid(elem, this.strip);
            return false;
        };

        Content.prototype.fireAdd = function () {
            ClipWall.e.fire(Content.CADD, this);
        };

        Content.prototype.fireDel = function () {
            ClipWall.e.fire(Content.CDEL, this.id);
        };
        Content.CADD = "addcontent";
        Content.CDEL = "removecontent";

        Content.IdGen = 0;
        return Content;
    })();
    ClipWall.Content = Content;
})(ClipWall || (ClipWall = {}));
