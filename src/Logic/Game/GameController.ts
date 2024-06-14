import {AirplaneController} from "../Dispatcher/AirplaneController.js";
import {GameMap} from "../../Data/Models/GameMap/GameMap.js";
import {ParachutistController} from "../Catchable/ParachutistController.js";
import {BoatController, EDirection} from "../Catcher/BoatController.js";
import {PlayerModel} from "../../Data/Models/PlayerModel.js";

export class GameController {
    private readonly parachutistsSpeed: number = 1;
    private readonly planeSpeed: number = 1;
    private readonly boatSpeed: number = 1;
    private readonly mapHeight: number = 10;
    private readonly mapWidth: number = 10;
    private readonly blockSize: number = 50;
    private readonly waterLevelHeight: number = 1;
    private readonly playerCatchScore:number = 10;
    private readonly boatWidth:number = 100;
    private readonly playerDefaultLives:number = 3;
    private readonly playDefaultScore:number = 0;
    private player: PlayerModel;
    private gameRunning: boolean;
    private airPlaneController: AirplaneController;
    private parachutistController: ParachutistController;
    private gameTickInterval: number = 500; // 1 second per game tick
    private gameMap: GameMap;
    private ctx: CanvasRenderingContext2D;
    private boatController : BoatController;
    private boatsChosenDirection: EDirection;

    constructor(canvasId: string){
       const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

       this.ctx = canvas.getContext('2d')!;
       this.gameMap = new GameMap(this.mapWidth,this.mapHeight,this.blockSize, this.waterLevelHeight);

      this.gameRunning = false;

      this.airPlaneController = new AirplaneController();
      this.parachutistController = new ParachutistController();

      this.boatController = new BoatController(
          (this.mapWidth/2)*this.gameMap.blockSize,
          (this.gameMap.height-this.gameMap.waterLevelBlockHeight)*this.gameMap.blockSize,
          this.boatSpeed*this.gameMap.blockSize,
          this.boatWidth
      );
      this.boatsChosenDirection = EDirection.STAY;

      this.player = new PlayerModel(this.playDefaultScore ,this.playerDefaultLives);
    }

    public gameTick():void {

            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // Clear the canvas for the new frame
            this.gameMap.draw(this.ctx);

            if (!this.airPlaneController.airPlaneExists){
                const planeSpeed: number = this.planeSpeed * this.gameMap.blockSize;
                this.airPlaneController.createAndLaunchAirPlane(this.gameMap.width*this.gameMap.blockSize,0,planeSpeed);
            }

            this.airPlaneController.move();
            this.parachutistController.move((this.gameMap.height-this.gameMap.waterLevelBlockHeight)*this.gameMap.blockSize)
            this.boatController.move(this.gameMap.width*this.gameMap.blockSize, this.boatsChosenDirection);
            //move airplane
            //move parachutists
            //move ship

            this.airPlaneController.draw(this.ctx);
            this.parachutistController.draw(this.ctx);
            this.boatController.draw(this.ctx);
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
        this.player.draw(this.ctx);

        setInterval(this.catchChecker.bind(this), 100);
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));

        //boat.start
        //player.start
    }

    catchChecker() {
        // Check all parachutists if they are in boat level or in water level
        this.parachutistController.parachutists.forEach((parachutist, index) => {
            const xParachutistCoordinates:number = parachutist.getPosition().xCoordinate;
            const yParachutistCoordinates: number = parachutist.getPosition().yCoordinate;

            if (yParachutistCoordinates >= (this.gameMap.height - this.gameMap.waterLevelBlockHeight) * this.gameMap.blockSize) {
                if (yParachutistCoordinates === this.boatController.boat.yCoordinate &&
                    xParachutistCoordinates >= this.boatController.boat.xCoordinate &&
                    xParachutistCoordinates <= (this.boatController.boat.xCoordinate + this.boatController.boat.width)) {
                    // Catch
                    this.player.score += this.playerCatchScore;
                    console.log(`Parachutist caught! Score is now: ${this.player.score}`);
                } else {
                    // Miss
                    this.player.lives--;
                    console.log(`Parachutist missed. Lives remaining: ${this.player.lives}`);
                    if (this.player.lives <= 0) {
                        this.gameRunning = false
                    }
                }
                // Remove parachutist from the array as it's either caught or missed
                this.parachutistController.parachutists.splice(index, 1);
            }
            this.player.draw(this.ctx);
    })}


    private onParachutistDispatched(planeXCoordinate: number, planeYCoordinate: number) {
        console.log(`Parachutist dispatched at X: ${planeXCoordinate}, Y: ${planeYCoordinate}`);
        this.parachutistController.spawnParachutist(planeXCoordinate, planeYCoordinate,
            this.parachutistsSpeed*this.gameMap.blockSize);

    }

    private handleKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
                this.boatController.move(this.gameMap.width*this.gameMap.blockSize, EDirection.LEFT)

                // this.boatsChosenDirection = EDirection.LEFT;
                break;
            case "ArrowRight":
                this.boatController.move(this.gameMap.width*this.gameMap.blockSize, EDirection.RIGHT)

                // this.boatsChosenDirection = EDirection.RIGHT;
                break;
        }
    }

    private handleKeyUp(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
            case "ArrowRight":
                this.boatController.move(this.gameMap.width*this.gameMap.blockSize, EDirection.STAY)

                // this.boatsChosenDirection = EDirection.STAY;  // Stop moving when the keys are released
                break;
        }
    }

}
