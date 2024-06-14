import {Position} from "../Data/Models/Position.js";
import {Dimensions} from "../Data/Models/Dimentions";

export interface Movable {
  updatePosition( position: Position ): void;
  getPosition(): Position;
  getSpeed(): number;
  getDimensions(): Dimensions;
}

export interface MovementStrategy {
  move(movable: Movable): void;
}