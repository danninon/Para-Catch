import {IDisplayTwoDimensions} from "../IDisplayTwoDimensions.js";
import {pathImageParachutists} from "../../Configuration/GameConfigurations.js";

export class ParachutistDisplay implements IDisplayTwoDimensions {
    private readonly image: HTMLImageElement;

    constructor() {
        this.image = new Image();
        this.image.src = pathImageParachutists;
    }

    draw(ctx: CanvasRenderingContext2D, xCoordinate: number, yCoordinate: number, xLength: number, yLength: number): void {
        if (this.image.complete) {
            ctx.drawImage(
                this.image,
                xCoordinate,
                yCoordinate,
                xLength,
                yLength
            );
        } else {
            //error
        }
    }
}
