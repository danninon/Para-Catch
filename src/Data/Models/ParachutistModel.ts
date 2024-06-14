export class ParachutistModel {
    private _xCoordinate: number;
    private _yCoordinate: number;
    private _speed: number;
    private readonly width: number; // New attribute for the width of the boat
    private readonly height: number;

    constructor(xCoordinate: number, yCoordinate: number, speed: number) {
        this._xCoordinate = xCoordinate;
        this._yCoordinate = yCoordinate;
        this._speed = speed;
        this.width = 20;
        this.height = 40;
    }

    get xCoordinate(): number {
        return this._xCoordinate;
    }

    set xCoordinate(value: number) {
        this._xCoordinate = value;
    }
    get yCoordinate(): number {
        return this._yCoordinate;
    }

    set yCoordinate(value: number) {
        this._yCoordinate = value;
    }
    get speed(): number {
        return this._speed;
    }

    set speed(value: number) {
        this._speed = value;
    }
}