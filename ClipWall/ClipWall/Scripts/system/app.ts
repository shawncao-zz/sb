import test = require("lib/utils");

// Interface
export interface IPoint {
    getDist(): number;
    name: string;
};

// Module
export module Utils {
    // Class
    export class Point implements IPoint {
        // Constructor
        constructor(public x: number, public y: number) { }

        // Instance member
        getDist() { return Math.sqrt(this.x * this.x + this.y * this.y); }

        get name() {
            var t = new test.Test("Shawn");
            return t.isValid("ab") ? "valid" : "invalid";
        }

        // Static member
        static origin = new Point(0, 0);
    }

    export function start() {
        // Local variables
        var p: IPoint = new Utils.Point(3, 4);
        alert(p.name + ":" + p.getDist());
    }
}
