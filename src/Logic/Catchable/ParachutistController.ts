import {ParachutistModel} from "../../Data/Models/ParachutistModel.js";
import {ParachutistDisplay} from "./ParachutistDisplay.js";
import {IDisplayTwoDimensions} from "../IDisplayTwoDimensions.js";
import {IGameDrawer} from "../IGameDrawer.js";
import {parachutistXLength, parachutistYLength} from "../../Configuration/GameConfigurations.js";
import {Position} from "../../Data/Models/Utils/Position.js";


export class ParachutistController implements IGameDrawer {
    private display: IDisplayTwoDimensions;

    constructor() {
        this._parachutists = []
        this.display = new ParachutistDisplay();
    }

    private _parachutists: ParachutistModel[];
    get parachutists(): ParachutistModel[] {
        return this._parachutists;
    }


    spawnParachutist(planePosition: Position, parachutistsSpeedByCoordinates: number) {
        const newParachutist = new ParachutistModel(
            {
                xCoordinate: planePosition.xCoordinate,
                yCoordinate: planePosition.yCoordinate
            }, parachutistsSpeedByCoordinates);
        this._parachutists.push(newParachutist);
    }

    public move(waterLevelByYCoordinates: number): void {
        this._parachutists.forEach(parachutist => {
            parachutist.getPosition().yCoordinate += parachutist.getSpeed();
        })

        this._parachutists = this._parachutists.filter(parachutist => {
            return parachutist.getPosition().yCoordinate <= waterLevelByYCoordinates;
        });
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        this._parachutists.forEach(parachutist => {

            this.display.draw(
                ctx,
                parachutist.getPosition().xCoordinate,
                parachutist.getPosition().yCoordinate,
                parachutistXLength,
                parachutistYLength
            );
        });
    }

}