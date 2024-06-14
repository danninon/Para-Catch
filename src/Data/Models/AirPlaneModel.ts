import {Position} from "./Utils/Position.js";
import {Dimensions} from "./Utils/Dimentions.js";
import {Movable, MovementStrategy} from "../../Logic/IMovable.js";


export class AirPlaneModel implements Movable{


    // private _xCoordinate: number;
    // private _yCoordinate: number;
    private _speed: number;
  //  private readonly planeImage: HTMLImageElement;

    // private readonly _width: number;
    // private readonly _height: number;
    // private readonly speed: number;
    private position: Position;
    private readonly dimensions: Dimensions;

    //from the above we can figure out time alive

    constructor(position: Position, speed: number){
        this.dimensions = {xLength: 100, yLength: 50};
        this.position = position
        this._speed = speed;
        // this._speed = speed;

    }

    updatePosition(position: Position): void {
        this.position = position;
    }
    getPosition(): Position {
        return this.position;
    }
    getSpeed(): number {
        return this.speed;
    }
    getDimensions(): Dimensions  {
        return this.dimensions;
    }

    get width(){
        return this.dimensions.xLength;
    }

    get height(){
        return this.dimensions.yLength
    }


    get xCoordinate() {
        return this.position.xCoordinate;
    }

    //cannot be negative
    set xCoordinate(value: number) {
        this.position.xCoordinate = value;
    }

    get yCoordinate() {
        return this.position.yCoordinate;
    }

    //cannot be negative
    set yCoordinate(value: number) {
        this.position.yCoordinate = value;
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
