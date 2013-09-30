/// <reference path="../lib/page.ts" />
/// <reference path="../lib/utils.ts" />
/// <reference path="../lib/css.ts" />
/// <reference path="panel.ts" />
/// <reference path="mode.click.ts" />
/// <reference path="mode.drag.ts" />
/// <reference path="mode.select.ts" />

var loaded;
// do not load twice
if (!loaded) {
    loaded = true;
    // load css file we need
    ClipWall.Css.load("clip");

    // create a panel
    ClipWall.Panel.CreatePanel();

    // use one clip mode for testing
    var mode: IClipMode = new ClipWall.SelectMode();
    mode.apply();
}