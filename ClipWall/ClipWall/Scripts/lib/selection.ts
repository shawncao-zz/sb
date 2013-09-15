/// <reference path="utils.ts" />

module ClipWall {
    export class Selection {
        private mouseDown: (e) => any;
        private mouseUp: (e) => any;
        private mouseMove: (e) => any;
        private _target: HTMLElement;
        private _position: Point;
        private _flag: number;

        private onstart: (s: Selection) => void;
        private onselecting: (s: Selection) => void;
        private onselected: (s: Selection) => void;

        constructor(
            start: (s: Selection) => void,
            selecting: (s: Selection) => void,
            selected: (s: Selection) => void) {

            this.onstart = start;
            this.onselecting = selecting;
            this.onselected = selected;

            this.mouseDown = (e) => {
                this._target = <HTMLElement>u.evt(e).target;
                this._position = Point.from(<MouseEvent>e);
                if (this._flag === 0) {
                    this._flag = 1;
                    u.stop(e);
                }

                if (u.valid(this.onstart)) {
                    this.onstart(this);
                }
            };

            this.mouseMove = (e) => {
                if (this._flag == 0) {
                    return;
                }

                this._position = Point.from(<MouseEvent>e);
                if (this._flag == 1) {
                    this._flag = 2;
                }

                if (u.valid(this.onselecting)) {
                    this.onselecting(this);
                }

                u.stop(e);
            };

            this.mouseUp = (e) => {
                this._flag = 0;
                if (u.valid(this.onselected)) {
                    this.onselected(this);
                }

                this._target = null;

                u.stop(e);
            };
        }

        public get target(): HTMLElement {
            return this._target;
        }

        public get position(): Point {
            return this._position;
        }

        public enable(bind: boolean) {
            var handle = bind ? e.be : e.ue;
            handle(g.b, "mousedown", this.mouseDown);
            handle(g.b, "mousemove", this.mouseMove);
            handle(g.b, "mouseup", this.mouseUp);
            u.mouseselect(g.b, bind);
        }
    }
}