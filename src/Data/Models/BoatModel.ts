import {Position} from "./Utils/Position.js";
import {Dimensions} from "./Utils/Dimentions.js";
import {Movable} from "../../Logic/IMovable.js";

export class BoatModel implements Movable {
    private readonly speed: number;
    private position: Position;
    private readonly dimensions: Dimensions;


    constructor(position: Position, speed: number, xLength:number){
        this.dimensions = {xLength: xLength, yLength: 50};
        this.position = position
        this.speed = speed;
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



}
