import {IMoveable} from "../../Logic/IMoveable.js";

export class BoatModel {

    private _xCoordinate: number;
    private _yCoordinate: number;
    private _speed: number;
    private readonly _width: number; // New attribute for the width of the boat
    private readonly boatImage: HTMLImageElement;
    private readonly height: number;

    //from the above we can figure out time alive
    constructor(x: number, y: number, speed: number, width: number) {
        this._xCoordinate = x;
        this._yCoordinate = y;
        this._speed = speed;
        this._width = width;
        this.height = 50;
        this.boatImage = new Image();
        this.boatImage.src = '../../../static/resources/boat.png';

    }

    get width(): number {
        return this._width;
    }

    get xCoordinate() {
        return this._xCoordinate;
    }

    //cannot be negative
    set xCoordinate(value: number) {
        this._xCoordinate = value;
    }

    get yCoordinate() {
        return this._yCoordinate;
    }

    //cannot be negative
    set yCoordinate(value: number) {
        this._yCoordinate = value;
    }

    get speed() {
        return this._speed;
    }

    set speed(value: number) {
        if (value < 0) {
            console.log("Speed cannot be negative.");
        } else {
            this._speed = value;
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        // Assuming the airplane is represented as a simple rectangle
      //  ctx.fillStyle = 'green';
        ctx.drawImage(this.boatImage, this.xCoordinate, this.yCoordinate, this.width, this.height); // Draw a rectangle as the airplane
    }
}
