import {Movable} from "../../Logic/IMovable";
import { Dimensions } from "./Dimentions";
import { Position } from "./Position";

export class ParachutistModel implements Movable {
    private readonly speed: number;
    private position: Position;
    private readonly dimensions: Dimensions;

    constructor(position: Position, speed: number){
        this.dimensions = {xLength: 20, yLength: 40};
        this.position = position
        this.speed = speed;
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