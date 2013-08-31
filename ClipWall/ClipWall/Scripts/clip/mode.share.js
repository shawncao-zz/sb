var ClipWall;
(function (ClipWall) {
    // pointer-events:none;
    var greyoutPattern = 'top:{0}px;left:{1}px;width:{2}px;height:{3}px';

    // if parameter is empty, create full screen to cover document
    function createOverlay(under) {
        var s = ClipWall.g.ce('div');
        if (under === ClipWall.g.b) {
            ClipWall.g.at(s, 'class', 'greyout');
        } else {
            var rect = { top: 0, left: 0, width: 0, height: 0 };
            if (ClipWall.u.valid(under)) {
                rect = under.getBoundingClientRect();
            }
            ClipWall.g.at(s, 'class', 'overlay');
            ClipWall.g.at(s, 'style', ClipWall.u.format(greyoutPattern, rect.top.toString(), rect.left.toString(), rect.width.toString(), rect.height.toString()));
            //s.innerHTML = "<p>drag to expand it...</p>";
        }

        ClipWall.g.b.appendChild(s);
        return s;
    }
    ClipWall.createOverlay = createOverlay;

    function updateOverlay(elem, x, y, w, h) {
        if (y !== 0)
            elem.style.top = (parseInt(elem.style.top) + y) + 'px';
        if (x !== 0)
            elem.style.left = (parseInt(elem.style.left) + x) + 'px';
        if (w !== 0)
            elem.style.width = (parseInt(elem.style.width) + w) + 'px';
        if (h !== 0)
            elem.style.height = (parseInt(elem.style.height) + h) + 'px';
    }
    ClipWall.updateOverlay = updateOverlay;
})(ClipWall || (ClipWall = {}));
