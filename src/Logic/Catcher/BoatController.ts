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
       this._boat = new BoatModel(xCoordinate,yCoordinate,speed,width);
       this.display = new DisplayBoat();
   }

   public move(maxWidth: number, direction: EDirection ){
        if (direction === EDirection.LEFT && this.boat.xCoordinate > 0){
            this.boat.xCoordinate -= this.boat.speed;
        }else if (direction === EDirection.RIGHT && this.boat.xCoordinate + this.boat.width < maxWidth){
            this.boat.xCoordinate += this.boat.speed;
        }
   }
    public draw(ctx: CanvasRenderingContext2D): void {
        if (this._boat) {
            this.display.draw(ctx, this._boat.xCoordinate, this._boat.yCoordinate, this._boat.width, this._boat.height);  // Assume height is 20
        }
    }

    // public draw(ctx: CanvasRenderingContext2D): void {
    //     if (this.boat) {
    //         this.boat.draw(ctx);
    //     }
    // }
}