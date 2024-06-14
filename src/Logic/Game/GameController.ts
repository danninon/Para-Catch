import {Parachutist} from "../../Data/Models/Parachutist.js";
import {AirplaneController} from "../Dispatcher/AirPlaneController/AirplaneController.js";
import {GameMap} from "../../Data/Models/GameMap/GameMap.js";
import {ParachutistController} from "../Catchable/ParachutistController.js";

export class GameController {
    private readonly parachutistsSpeed: number = 1;
    private readonly planeSpeed: number = 1;
    private readonly mapHeight: number = 10;
    private readonly mapWidth: number = 10;
    private readonly blockSize: number = 50;
    private readonly waterLevelHeight: number = 1;


    private gameRunning: boolean;
    private airPlaneController: AirplaneController;
    private parachutistController: ParachutistController;
    private gameTickInterval: number = 1000; // 1 second per game tick
    private gameMap: GameMap;
    private ctx: CanvasRenderingContext2D;
    //private boatController : BoatController;

    constructor(canvasId: string){
       const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

       this.ctx = canvas.getContext('2d')!;
       this.gameMap = new GameMap(this.mapWidth,this.mapHeight,this.blockSize, this.waterLevelHeight);

      this.gameRunning = false;

      this.airPlaneController = new AirplaneController();
      this.parachutistController = new ParachutistController();

    }

    public gameTick():void {

            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // Clear the canvas for the new frame
            this.gameMap.draw(this.ctx);

            if (!this.airPlaneController.airPlaneExists){
                const planeSpeed: number = this.planeSpeed * this.gameMap.blockSize;
                this.airPlaneController.createAndLaunchAirPlane(0,0,planeSpeed);
            }

            this.airPlaneController.move(this.gameMap.width*this.gameMap.blockSize);
            this.parachutistController.move((this.gameMap.height-this.gameMap.waterLevelHeight)*this.gameMap.blockSize)
            //move airplane
            //move parachutists
            //move ship

            this.airPlaneController.draw(this.ctx);
            this.parachutistController.draw(this.ctx);
            // check all parachutists if they are in boat level or in water level




    }
    public run():void{
        this.initialization()
        if(this.gameRunning) {
            setInterval(() => this.gameTick(), this.gameTickInterval);
        }


    }
    private initialization() {
        this.gameRunning = true;
        this.airPlaneController.start();
        this.airPlaneController.addDispatchedParachutistListener(this.onParachutistDispatched.bind(this));


        //boat.start
        //player.start
    }

    private onParachutistDispatched(planeXCoordinate: number, planeYCoordinate: number) {
        console.log(`Parachutist dispatched at X: ${planeXCoordinate}, Y: ${planeYCoordinate}`);
        this.parachutistController.spawnParachutist(planeXCoordinate, planeYCoordinate,
            this.parachutistsSpeed*this.gameMap.blockSize);

    }
}