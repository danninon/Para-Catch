// ParachutistDisplay.ts
import {IDisplayTwoDimensions} from "../IDisplayTwoDimensions.js";

export class ParachutistDisplay implements IDisplayTwoDimensions {
    private readonly image: HTMLImageElement;

    constructor() {
        this.image = new Image();
        this.image.src = '../../../static/resources/parachutist.png';  // Path to the parachutist image
    }

    draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
        if (this.image.complete) {
            ctx.drawImage(this.image, x, y, width, height);
        } else {
         //error
        }
    }
}
