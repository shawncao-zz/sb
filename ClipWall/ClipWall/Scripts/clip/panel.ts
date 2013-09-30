module ClipWall {
    export class Panel {
        private modes: IClipMode[] = [];
        public static CreatePanel(): Panel {
            return new Panel();
        }
        constructor() {
            var p = g.ce('div');
            g.at(p, 'class', 'panel');
            p.innerHTML = "Here will be menu for modes selection and content<div id='cnt'></div>";
            g.b.insertBefore(p, g.b.firstChild);
            e.bind("addcontent", (text) => {
                g.ge("cnt").innerHTML += "<br/>" + text;
            });
        }

    }
}