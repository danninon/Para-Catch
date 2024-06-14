import {IMoveable} from "../../Logic/IMoveable.js";

export class BoatModel {

    private _xCoordinate: number;
    private _yCoordinate: number;
    private _speed: number;
    private readonly _width: number; // New attribute for the width of the boat
    private readonly _height: number;

    //from the above we can figure out time alive
    constructor(x: number, y: number, speed: number, width: number) {
        this._xCoordinate = x;
        this._yCoordinate = y;
        this._speed = speed;
        this._width = width;
        this._height = 50;
    }

    get height(): number{
        return this._height;
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

}
