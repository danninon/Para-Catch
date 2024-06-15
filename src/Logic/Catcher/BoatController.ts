import {BoatModel} from "../../Data/Models/BoatModel.js";
import {DisplayBoat} from "./BoatDisplay.js";
import {Position} from "../../Data/Models/Utils/Position.js";
import {IDisplayTwoDimensions} from "../IDisplayTwoDimensions.js";
import {IGameDrawer} from "../IGameDrawer";

export enum EDirection {LEFT,RIGHT,STAY}

export class BoatController implements IGameDrawer{
    get boat(): BoatModel {
        return this._boat;
    }
   private readonly _boat: BoatModel;
   private display: IDisplayTwoDimensions;

   //todo: get Position instead of making it here
   constructor(positionByCoordinates:Position, speedByCoordinates: number, boatXLength: number){
       this._boat = new BoatModel(
           positionByCoordinates,
           speedByCoordinates,
           boatXLength
       );
       this.display = new DisplayBoat();
   }

   public move(maxWidth: number, direction: EDirection ){
        if (direction === EDirection.LEFT && this.boat.getPosition().xCoordinate > 0){
            this.boat.getPosition().xCoordinate -= this.boat.getSpeed();
        }else if (direction === EDirection.RIGHT && this.boat.getPosition().xCoordinate + this.boat.getDimensions().xLength < maxWidth){
            this.boat.getPosition().xCoordinate += this.boat.getSpeed();
        }
   }

   public draw(ctx: CanvasRenderingContext2D): void {
        if (this._boat) {
            this.display.draw(
                ctx,
                this._boat.getPosition().xCoordinate,
                this._boat.getPosition().yCoordinate,
                this._boat.getDimensions().xLength,
                this._boat.getDimensions().yLength
            );  // Assume height is 20
        }
    }

}