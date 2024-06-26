import {BoatModel} from "../../Data/Models/BoatModel.js";
import {DisplayBoat} from "./BoatDisplay.js";
import {Position} from "../../Data/Models/Utils/Position.js";
import {IDisplayTwoDimensions} from "../IDisplayTwoDimensions.js";
import {IGameDrawer} from "../IGameDrawer.js";

export enum EDirection {LEFT, RIGHT, STAY}

export class BoatController implements IGameDrawer {
    private readonly _boat: BoatModel;
    private display: IDisplayTwoDimensions;


    constructor(positionByCoordinates: Position, speedByCoordinates: number, boatXLength: number) {
        this._boat = new BoatModel(
            positionByCoordinates,
            speedByCoordinates,
            boatXLength
        );
        this.display = new DisplayBoat();
    }

    get boat(): BoatModel {
        return this._boat;
    }

    public move(maxWidth: number, direction: EDirection) {
        if (direction === EDirection.LEFT && this.boat.getPosition().xCoordinate > 0) {
            this.boat.getPosition().xCoordinate -= this.boat.getSpeed();
        } else if (direction === EDirection.RIGHT && this.boat.getPosition().xCoordinate + this.boat.getDimensions().xLength < maxWidth) {
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
            );
        }
    }

}