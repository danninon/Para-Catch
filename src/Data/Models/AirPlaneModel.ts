import {Position} from "./Utils/Position.js";
import {MovableModel} from "./MovableModel.js";
import {AirplaneDimensions} from "../../Configuration/GameConfigurator.js";


export class AirPlaneModel extends MovableModel{

    constructor(position: Position, speed: number){
        super(position, AirplaneDimensions, speed)
    }
}
