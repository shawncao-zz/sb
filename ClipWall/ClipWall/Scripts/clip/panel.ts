module ClipWall {
    export class Panel {
        public static CreatePanel(): Panel {
            return new Panel(0);
        }
        constructor(public mode: number) {
        }
    }
}