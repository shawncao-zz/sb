module ClipWall {
    export class Content {
        // add/remove event names
        public static CADD: string = "addcontent";
        public static CDEL: string = "removecontent";

        // id generation
        private static IdGen: number = 0;

        // content wrapper
        private id: number;
        constructor(private text: string= null, private dom: HTMLElement = null) {
            this.id = Content.IdGen++;
        }

        public toString(): string {
            if (!u.empty(this.text)) {
                return this.text;
            }

            if (u.valid(this.dom)) {
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
        }

        private strip(elem: HTMLElement): boolean {
            elem.className = "";
            if (elem.style) {
                g.sat(elem, "style", "");
            }

            u.eachKid(elem, this.strip);
            return false;
        }

        public fireAdd(): void {
            e.fire(Content.CADD, this);
        }

        public fireDel(): void {
            e.fire(Content.CDEL, this.id);
        }
    }
}