

export class AirPlaneModel{
    private _xCoordinate: number;
    private _yCoordinate: number;
    private _speed: number;
  //  private readonly planeImage: HTMLImageElement;

    private readonly _width: number;
    private readonly _height: number;


    //from the above we can figure out time alive

    constructor(x: number, y: number, speed: number) {
        this._xCoordinate = x;
        this._yCoordinate = y;
        this._speed = speed;

        this._width = 100;
        this._height = 50;
    }

    get width(){
        return this._width
    }

    get height(){
        return this._height
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
