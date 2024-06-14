import {Parachutist} from "../../Data/Models/Parachutist.js";

export class ParachutistController {
    private parachutists :Parachutist[];


    constructor(){
        this.parachutists = []
    }

    spawnParachutist(planeXCoordinate: number, planeYCoordinate: number, parachutistsSpeed: number) {
        const newParachutist = new Parachutist(planeXCoordinate, planeYCoordinate, parachutistsSpeed);
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