import {IMoveable} from "../../Logic/IMoveable.js";

export class AirPlaneModel implements IMoveable{
    private _xCoordinate: number;
    private _yCoordinate: number;
    private _speed: number;
    //from the above we can figure out time alive

    constructor(x: number, y: number, speed: number) {
        this._xCoordinate = x;
        this._yCoordinate = y;
        this._speed = speed;
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

    //time cannot be negative and cannot exceed the total time of flight
    public move() {
        this._xCoordinate += this._speed;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        // Assuming the airplane is represented as a simple rectangle
        ctx.fillStyle = 'red';
        ctx.fillRect(this.xCoordinate, this.yCoordinate, 50, 20); // Draw a rectangle as the airplane
    }
}
