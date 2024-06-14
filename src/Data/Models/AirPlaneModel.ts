import {IMoveable} from "../../Logic/IMoveable.js";

export class AirPlaneModel{
    private _xCoordinate: number;
    private _yCoordinate: number;
    private _speed: number;
    private readonly planeImage: HTMLImageElement;

    private readonly width: number;
    private readonly height: number;

    //from the above we can figure out time alive

    constructor(x: number, y: number, speed: number) {
        this._xCoordinate = x;
        this._yCoordinate = y;
        this._speed = speed;

        this.width = 100;
        this.height = 50;
        this.planeImage = new Image();
        this.planeImage.src = '../../../static/resources/plane.png';
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
        ctx.drawImage(this.planeImage, this.xCoordinate, this.yCoordinate, this.width, this.height); // Draw a rectangle as the airplane
    }

    // public draw(ctx: CanvasRenderingContext2D): void {
    //     // Assuming the airplane is represented as a simple rectangle
    //     ctx.fillStyle = 'red';
    //     ctx.fillRect(this.xCoordinate, this.yCoordinate, 50, 20); // Draw a rectangle as the airplane
    // }
}
