import {BoatModel} from "../../Data/Models/BoatModel.js";
import {DisplayBoat} from "./BoatDisplay.js";

export enum EDirection {LEFT,RIGHT,STAY}

export class BoatController {
    get boat(): BoatModel {
        return this._boat;
    }

   private readonly _boat: BoatModel;
   private display: DisplayBoat;

   constructor(xCoordinate: number, yCoordinate: number, speed: number, width: number){
       this._boat = new BoatModel({
           xCoordinate:xCoordinate,
           yCoordinate:yCoordinate},
           speed,width
       );
       this.display = new DisplayBoat();
   }
    // public move(maxWidth: number, direction: EDirection ){
    //     const boatPosition = this.boat.getPosition();
    //
    //     if (direction === EDirection.LEFT && boatPosition.xCoordinate > 0){
    //         boatPosition.xCoordinate -= this.boat.getSpeed();
    //     }else if (direction === EDirection.RIGHT && boatPosition.xCoordinate + this.boat.getDimensions().xLength < maxWidth){
    //         boatPosition.xCoordinate += this.boat.getSpeed();
    //     }
    // }
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

    // public draw(ctx: CanvasRenderingContext2D): void {
    //     if (this.boat) {
    //         this.boat.draw(ctx);
    //     }
    // }
}