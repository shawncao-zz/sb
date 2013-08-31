module ClipWall {
    // pointer-events:none;
    var greyoutPattern: string = 'top:{0}px;left:{1}px;width:{2}px;height:{3}px';
    // if parameter is empty, create full screen to cover document
    export function createOverlay(under?: HTMLElement): HTMLElement {
        var s = g.ce('div');
        if (under === g.b) {
            g.at(s, 'class', 'greyout');
        } else {
            var rect = { top: 0, left: 0, width: 0, height: 0 };
            if (u.valid(under)) {
                rect = under.getBoundingClientRect();
            }
            g.at(s, 'class', 'overlay');
            g.at(s, 'style', u.format(greyoutPattern,
                rect.top.toString(),
                rect.left.toString(),
                rect.width.toString(),
                rect.height.toString()));
            //s.innerHTML = "<p>drag to expand it...</p>";
        }

        g.b.appendChild(s);
        return s;
    }

    export function updateOverlay(
        elem: HTMLElement,
        x: number,
        y: number,
        w: number,
        h: number) {
        if (y !== 0)
            elem.style.top = (parseInt(elem.style.top) + y) + 'px';
        if (x !== 0)
            elem.style.left = (parseInt(elem.style.left) + x) + 'px';
        if (w !== 0)
            elem.style.width = (parseInt(elem.style.width) + w) + 'px';
        if (h !== 0)
            elem.style.height = (parseInt(elem.style.height) + h) + 'px';
    }
}