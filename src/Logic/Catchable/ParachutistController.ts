import {ParachutistModel} from "../../Data/Models/ParachutistModel.js";
import {ParachutistDisplay} from "./ParachutistDisplay.js";


export class ParachutistController  {
    get parachutists(): ParachutistModel[] {
        return this._parachutists;
    }

    private _parachutists: ParachutistModel[];
    private display: ParachutistDisplay;


    constructor() {
        this._parachutists = []
        this.display = new ParachutistDisplay();
    }

    spawnParachutist(planeXCoordinate: number, planeYCoordinate: number, parachutistsSpeed: number) {
        const newParachutist = new ParachutistModel(
            {
                xCoordinate: planeXCoordinate,
                yCoordinate: planeYCoordinate
            }, parachutistsSpeed);
        console.log("spawnParachutist", newParachutist)
        this._parachutists.push(newParachutist);
    }

    public move(waterLevelPixels: number): void {
        console.log("move: parachutists", this._parachutists);

        this._parachutists.forEach(parachutist => {
            parachutist.getPosition().yCoordinate += parachutist.getSpeed();
        })

        this._parachutists = this._parachutists.filter(parachutist => {
            console.log('waterLevelPixels', waterLevelPixels)
        //    console.log('parachutist.yCoordinate', parachutist.yCoordinate);
            return parachutist.getPosition().yCoordinate <= waterLevelPixels;
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