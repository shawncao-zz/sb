var lastelem;

document.onmouseover = function (e) {
    var event = e || window.event;

    if (lastelem) {
        lastelem.style.border = "1px solid #fff";
    }

    var target = event.target || event.srcElement;
    target.style.border = "1px solid";
    lastelem = target;
};