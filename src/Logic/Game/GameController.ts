import {AirplaneController} from "../Dispatcher/AirplaneController.js";
import {GameMap} from "../../Data/Models/GameMap/GameMap.js";
import {ParachutistController} from "../Catchable/ParachutistController.js";
import {BoatController, EDirection} from "../Catcher/BoatController.js";
import {PlayerModel} from "../../Data/Models/PlayerModel.js";

export class GameController {
    private readonly parachutistsSpeedByBlocks: number = 1;
    private readonly planeSpeedByBlocks: number = 1;
    private readonly boatSpeedByBlocks: number = 1;
    private readonly mapHeightByBlocks: number = 10;
    private readonly mapWidthByBlocks: number = 10;
    private readonly waterLevelByBlocks: number = 1;
    private readonly boatWidthByBlocks: number = 2;

    private readonly waterLevelByYCoordinates: number;
    private readonly mapWidthByCoordinates: number;

    private readonly blockSize: number = 50;
    private readonly playerCatchScore: number = 10;
    private readonly playerDefaultLives: number = 3;
    private readonly playDefaultScore: number = 0;
    private player: PlayerModel;
    private gameRunning: boolean;
    private airPlaneController: AirplaneController;
    private parachutistController: ParachutistController;
    private gameTickInterval: number = 500; // 1 second per game tick
    private gameBlocksMap: GameMap;
    private ctx: CanvasRenderingContext2D;
    private boatController: BoatController;
    private boatsChosenDirection: EDirection;

    constructor(canvasId: string) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

        this.ctx = canvas.getContext('2d')!;
        this.gameBlocksMap = new GameMap(
            this.mapWidthByBlocks,
            this.mapHeightByBlocks,
            this.blockSize,
            this.waterLevelByBlocks
        );


        this.waterLevelByYCoordinates =
            (this.gameBlocksMap.height - this.gameBlocksMap.waterLevelBlockHeight) * this.gameBlocksMap.blockSize;

        this.mapWidthByCoordinates = this.mapWidthByBlocks * this.gameBlocksMap.blockSize;


        this.gameRunning = false;

        this.airPlaneController = new AirplaneController();
        this.parachutistController = new ParachutistController();

        //Todo: extract to function (currently doesn't work) because long and complicated?
        const xCoordinateMiddleMap = (this.mapWidthByBlocks / 2) * this.gameBlocksMap.blockSize;

        this.boatController = new BoatController(
            {
                xCoordinate: xCoordinateMiddleMap,
                yCoordinate: this.waterLevelByYCoordinates
            },
            this.boatSpeedByBlocks * this.gameBlocksMap.blockSize,
            this.boatWidthByBlocks * this.gameBlocksMap.blockSize
        );
        this.boatsChosenDirection = EDirection.STAY;
        //Todo: end

        this.player = new PlayerModel(this.playDefaultScore, this.playerDefaultLives);
    }

    public run(): void {
        this.initialization()
        if (this.gameRunning) {
            setInterval(() => this.gameTick(), this.gameTickInterval);
        }
    }

    private gameTick(): void {

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // Clear the canvas for the new frame
        this.gameBlocksMap.draw(this.ctx);

        if (!this.airPlaneController.airPlaneExists) {
            const planeSpeed: number = this.planeSpeedByBlocks * this.gameBlocksMap.blockSize;
            this.airPlaneController.createAndLaunchAirPlane(
                {
                    xCoordinate: this.mapWidthByCoordinates,
                    yCoordinate: 0
                },
                planeSpeed);
        }

        this.airPlaneController.move();
        this.parachutistController.move(this.waterLevelByYCoordinates);
        this.boatController.move(this.mapWidthByCoordinates, this.boatsChosenDirection);
        //move airplane
        //move parachutists
        //move ship

        this.airPlaneController.draw(this.ctx);
        this.parachutistController.draw(this.ctx);
        this.boatController.draw(this.ctx);
        // check all parachutists if they are in boat level or in water level


    }


    private catchChecker() {
        // Check all parachutists if they are in boat level or in water level
        this.parachutistController.parachutists.forEach((parachutist, index) => {
            const xParachutistCoordinates: number = parachutist.getPosition().xCoordinate;
            const yParachutistCoordinates: number = parachutist.getPosition().yCoordinate;
            const xBoatCoordinates: number = this.boatController.boat.getPosition().xCoordinate;
            const yBoatCoordinates: number = this.boatController.boat.getPosition().yCoordinate

            if (yParachutistCoordinates >= this.waterLevelByYCoordinates) {
                if (yParachutistCoordinates === yBoatCoordinates &&
                    xParachutistCoordinates >= xBoatCoordinates &&
                    xParachutistCoordinates <= (xBoatCoordinates + this.boatController.boat.getDimensions().xLength)) {
                    // Catch
                    this.player.score += this.playerCatchScore;
                    console.log(`Parachutist caught! Score is now: ${this.player.score}`);
                } else {
                    // Miss
                    this.player.lives--;
                    if (this.player.lives <= 0) {
                        this.gameRunning = false;
                    }
                }
                // Remove parachutist from the array as it's either caught or missed
                this.parachutistController.parachutists.splice(index, 1);
            }
            this.player.draw(this.ctx);
        })
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

    private onParachutistDispatched(planeXCoordinate: number, planeYCoordinate: number) {
        console.log(`Parachutist dispatched at X: ${planeXCoordinate}, Y: ${planeYCoordinate}`);
        this.parachutistController.spawnParachutist(planeXCoordinate, planeYCoordinate,
            this.parachutistsSpeedByBlocks * this.gameBlocksMap.blockSize);

    }

    private handleKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
                this.boatController.move(this.mapWidthByCoordinates, EDirection.LEFT)

                // this.boatsChosenDirection = EDirection.LEFT;
                break;
            case "ArrowRight":
                this.boatController.move(this.mapWidthByCoordinates, EDirection.RIGHT)

                // this.boatsChosenDirection = EDirection.RIGHT;
                break;
        }
    }

    private handleKeyUp(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
            case "ArrowRight":
                this.boatController.move(this.mapWidthByCoordinates, EDirection.STAY)

                // this.boatsChosenDirection = EDirection.STAY;  // Stop moving when the keys are released
                break;
        }
    }

}
