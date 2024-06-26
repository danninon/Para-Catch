import {Movable} from "../../Logic/IMovable.js";
import {Dimensions} from "./Utils/Dimentions.js";
import {Position} from "./Utils/Position.js";

export abstract class MovableModel implements Movable {
    private readonly speed: number;
    private position: Position;
    private readonly dimensions: Dimensions;

    constructor(position: Position, dimensions: Dimensions, speed: number) {
        this.dimensions = dimensions;
        this.position = position;
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

    getDimensions(): Dimensions {
        return this.dimensions;
    }

}