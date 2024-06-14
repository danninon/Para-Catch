import {ParachutistModel} from "../../Data/Models/ParachutistModel.js";

export class ParachutistController {
    private parachutists :ParachutistModel[];


    constructor(){
        this.parachutists = []
    }

    spawnParachutist(planeXCoordinate: number, planeYCoordinate: number, parachutistsSpeed: number) {
        const newParachutist = new ParachutistModel(planeXCoordinate, planeYCoordinate, parachutistsSpeed);
        console.log("spawnParachutist", newParachutist)
        this.parachutists.push(newParachutist);
    }

    public move(waterLevelPixels: number): void {
        console.log("move: parachutists", this.parachutists);

        this.parachutists.forEach(parachutist => {
            parachutist.yCoordinate += parachutist.speed;
        })

        this.parachutists = this.parachutists.filter(parachutist => {
            console.log('waterLevelPixels', waterLevelPixels)
            console.log('parachutist.yCoordinate', parachutist.yCoordinate);
            return parachutist.yCoordinate <= waterLevelPixels;
        });
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        console.log("draw: parachutists", this.parachutists);
        this.parachutists.forEach(parachutist => {
            parachutist.draw(ctx);
        })
    }

}