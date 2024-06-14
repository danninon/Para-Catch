export class ParachutistModel {
    private _xCoordinate: number;
    private _yCoordinate: number;
    private _speed: number;
    private readonly width: number; // New attribute for the width of the boat
    private readonly parachutistImage: HTMLImageElement;
    private readonly height: number;

    constructor(xCoordinate: number, yCoordinate: number, speed: number) {
        this._xCoordinate = xCoordinate;
        this._yCoordinate = yCoordinate;
        this._speed = speed;
        this.width = 20;
        this.height = 40;
        this.parachutistImage = new Image();
        this.parachutistImage.src = '../../../static/resources/parachutist.png';
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
        //  ctx.fillStyle = 'green';
        ctx.drawImage(this.parachutistImage, this.xCoordinate, this.yCoordinate, this.width, this.height); // Draw a rectangle as the airplane
    }
}