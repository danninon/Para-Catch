import {Position} from "./Utils/Position.js";
import {MovableModel} from "./MovableModel.js";
import {boatYLength} from "../../Configuration/GameConfigurator.js";


export class BoatModel extends MovableModel{
    constructor(position: Position, speed: number, xLength: number){
        super(position, {xLength: xLength,yLength: boatYLength }, speed)
    }
}
