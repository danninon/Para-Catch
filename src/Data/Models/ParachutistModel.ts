import {Position} from "./Utils/Position.js";
import {MovableModel} from "./MovableModel.js";
import {ParachutistDimensions} from "../../Configuration/GameConfigurator.js";


export class ParachutistModel extends MovableModel{

    constructor(position: Position, speed: number){
        super(position, ParachutistDimensions, speed)
    }
}
