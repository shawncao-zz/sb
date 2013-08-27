/// <reference path="page.ts" />
module ClipWall {
    //define utlity
    export module u {
        export function evt(e: Event) {
            var event = e || ClipWall.g.w.event;
            if (!event.target) {
                event.target = event.srcElement;
            }

            return event;
        }

        export function fullpath(rel: string): string {
            return ClipWall.g.h + rel;
        }

        export function contains(elem1: HTMLElement, elem2: HTMLElement): boolean {
            if (elem1 && elem2) {
                while (elem2) {
                    if (elem1 == elem2) {
                        return true;
                    }

                    elem2 = elem2.parentElement;
                }
            }

            return false;
        }

        export function stop(event: Event) {
            event.stopImmediatePropagation();
            event.preventDefault();
        }

        export function format(pattern: string, ...ps: string[]): string {
            if (!valid(ps)) {
                return pattern;
            }

            if (empty(pattern)) {
                return ps.join("");
            }

            for (var i = 0; i < ps.length; ++i) {
                pattern = pattern.replace(new RegExp("\\{" + i + "\\}", "gm"), ps[i]);
            }

            return pattern;
        }

        export function empty(str: string): boolean {
            return (!valid(str) || str.length === 0);
        }

        export function valid(obj: any): boolean {
            return (obj !== null && obj !== undefined && typeof (obj) !== "undefined");
        }
    }
}