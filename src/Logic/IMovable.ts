import {Position} from "../Data/Models/Utils/Position";
import {Dimensions} from "../Data/Models/Utils/Dimentions";

export interface Movable {
  updatePosition( position: Position ): void;
  getPosition(): Position;
  getSpeed(): number;
  getDimensions(): Dimensions;
}

