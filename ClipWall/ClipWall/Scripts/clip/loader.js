/// <reference path="../lib/page.ts" />
/// <reference path="../lib/utils.ts" />
/// <reference path="../lib/css.ts" />
/// <reference path="panel.ts" />
/// <reference path="mode.click.ts" />
/// <reference path="mode.drag.ts" />
var loaded;

if (!loaded) {
    loaded = true;

    // load css file we need
    ClipWall.Css.load("clip");

    // create a panel
    ClipWall.Panel.CreatePanel();

    // use one clip mode for testing
    var mode = new ClipWall.DragMode();
    mode.apply();
}
