export class ParachutistModel {
    private _xCoordinate: number;
    private _yCoordinate: number;
    private _speed: number;

    constructor(xCoordinate: number, yCoordinate: number, speed: number) {
        this._xCoordinate = xCoordinate;
        this._yCoordinate = yCoordinate;
        this._speed = speed;
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

    public draw(ctx: CanvasRenderingContext2D): void {
        // Assuming the airplane is represented as a simple rectangle
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.xCoordinate, this.yCoordinate, 5, 10); // Draw a rectangle as the airplane
    }
}