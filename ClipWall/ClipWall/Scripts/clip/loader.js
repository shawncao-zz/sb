define(["require", "exports"], function(require, exports) {
    
    var lastelem;

    document.onmouseover = function (e) {
        var event = e || window.event;

        if (lastelem) {
            lastelem.style.border = "1px solid #fff";
        }

        var target = event.target || event.srcElement;

        // document.getElementById('display').innerHTML = target.previousSibling.tagName + " | " + target.tagName + " | " + (target.nextSibling ? target.nextSibling.tagName : "X");
        target.style.border = "1px solid";
        lastelem = target;
    };
});
