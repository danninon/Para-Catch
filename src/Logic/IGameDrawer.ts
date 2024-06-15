import {IDisplayTwoDimensions} from "./IDisplayTwoDimensions";

export interface IGameDrawer{
    draw(ctx: CanvasRenderingContext2D): void;
}