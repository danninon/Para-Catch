import {ParachutistModel} from "../../Data/Models/ParachutistModel.js";
import {ParachutistDisplay} from "./ParachutistDisplay.js";
import {IDisplayTwoDimensions} from "../IDisplayTwoDimensions.js";
import {IGameDrawer} from "../IGameDrawer";


export class ParachutistController implements IGameDrawer {
    get parachutists(): ParachutistModel[] {
        return this._parachutists;
    }

    private _parachutists: ParachutistModel[];
    private display: IDisplayTwoDimensions;


    constructor() {
        this._parachutists = []
        this.display = new ParachutistDisplay();
    }

    //todo: make this get position instead of making it inside
    spawnParachutist(planeXCoordinate: number, planeYCoordinate: number, parachutistsSpeedByCoordinates: number) {
        const newParachutist = new ParachutistModel(
            {
                xCoordinate: planeXCoordinate,
                yCoordinate: planeYCoordinate
            }, parachutistsSpeedByCoordinates);
        console.log("spawnParachutist", newParachutist)
        this._parachutists.push(newParachutist);
    }

    public move(waterLevelByYCoordinates: number): void {
        console.log("move: parachutists", this._parachutists);

        this._parachutists.forEach(parachutist => {
            parachutist.getPosition().yCoordinate += parachutist.getSpeed();
        })

        this._parachutists = this._parachutists.filter(parachutist => {
            console.log('waterLevelPixels', waterLevelByYCoordinates)
        //    console.log('parachutist.yCoordinate', parachutist.yCoordinate);
            return parachutist.getPosition().yCoordinate <= waterLevelByYCoordinates;
        });
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        this._parachutists.forEach(parachutist => {

            this.display.draw(
                ctx,
                parachutist.getPosition().xCoordinate,
                parachutist.getPosition().yCoordinate,
                20,
                20
            );  // Assuming size
        });
    }

}