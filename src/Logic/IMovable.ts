import {Position} from "../Data/Models/Utils/Position.js";
import {Dimensions} from "../Data/Models/Utils/Dimentions.js";

export interface Movable {
    updatePosition(position: Position): void;

    getPosition(): Position;

    getSpeed(): number;

    getDimensions(): Dimensions;
}

