import {ParachutistModel} from "../../Data/Models/ParachutistModel.js";

export class ParachutistController {
    get parachutists(): ParachutistModel[] {
        return this._parachutists;
    }
    private _parachutists :ParachutistModel[];


    constructor(){
        this._parachutists = []
    }

    spawnParachutist(planeXCoordinate: number, planeYCoordinate: number, parachutistsSpeed: number) {
        const newParachutist = new ParachutistModel(planeXCoordinate, planeYCoordinate, parachutistsSpeed);
        console.log("spawnParachutist", newParachutist)
        this._parachutists.push(newParachutist);
    }

    public move(waterLevelPixels: number): void {
        console.log("move: parachutists", this._parachutists);

        this._parachutists.forEach(parachutist => {
            parachutist.yCoordinate += parachutist.speed;
        })

        this._parachutists = this._parachutists.filter(parachutist => {
            console.log('waterLevelPixels', waterLevelPixels)
            console.log('parachutist.yCoordinate', parachutist.yCoordinate);
            return parachutist.yCoordinate <= waterLevelPixels;
        });
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        console.log("draw: parachutists", this._parachutists);
        this._parachutists.forEach(parachutist => {
            parachutist.draw(ctx);
        })
    }

}