export interface IDisplayTwoDimensions {
    draw(
        ctx0: CanvasRenderingContext2D,
        xCoordinates: number,
        yCoordinates: number,
        xLength: number,
        yLength: number
    ): void;
}