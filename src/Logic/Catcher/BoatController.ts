import {BoatModel} from "../../Data/Models/BoatModel.js";

export enum EDirection {LEFT,RIGHT,STAY}

export class BoatController {

   private boat: BoatModel;

   constructor(xCoordinate: number, yCoordinate: number, speed: number){
       this.boat = new BoatModel(xCoordinate,yCoordinate,speed);

   }

   public move(maxWidth: number, direction: EDirection ){
        if (direction === EDirection.LEFT && this.boat.xCoordinate > 0){
            this.boat.xCoordinate -= this.boat.speed;
        }else if (direction === EDirection.RIGHT && this.boat.xCoordinate < maxWidth){
            this.boat.xCoordinate += this.boat.speed;
        }

   }


    public draw(ctx: CanvasRenderingContext2D): void {
        if (this.boat) {
            this.boat.draw(ctx);
        }
    }
}