import {AirplaneController} from "../Dispatcher/AirplaneController.js";
import {GameMap} from "../../Data/Models/GameMap/GameMap.js";
import {ParachutistController} from "../Catchable/ParachutistController.js";
import {BoatController, EDirection} from "../Catcher/BoatController.js";
import {PlayerModel} from "../../Data/Models/PlayerModel.js";
import {IGameDrawer} from "../IGameDrawer";
import {PlayDefaultScore,  PlaneSpeedByBlocks, BoatSpeedByBlocks, MapHeightByBlocks,
    MapWidthByBlocks, WaterLevelByBlocks, BoatWidthByBlocks, BlockSize, PlayerCatchScore,
    PlayerDefaultLives,ParachutistsSpeedByBlocks, GameTickIntervalByMilli, PlayTickIntervalByMilli
} from "../../Configuration/GameConfigurator.js";
import {GameDisplay} from "./GameDisplay.js";
import {GameLogic} from "./GameLogic.js";


export class GameController {
    private readonly waterLevelByYCoordinates: number; //this could be better represented by function
    private readonly mapWidthByCoordinates: number; //this could be better represented by function

    private gameDisplay:GameDisplay;
    private gameLogic:GameLogic;

    private player: PlayerModel;
    private gameRunning: boolean;

    private airPlaneController: AirplaneController;
    private parachutistController: ParachutistController;
    private boatController: BoatController;
    private boatsChosenDirection: EDirection;

    private gameTickIntervalId: number | null = null;
    private parachutistCheckIntervalId: number | null = null;

    private gameBlocksMap: GameMap;
    private ctx: CanvasRenderingContext2D;


    private gameDrawers: IGameDrawer[]

    constructor() {
        this.gameDrawers = [];

        const canvas = document.querySelector('canvas'); // Selects the first canvas element
        if (!canvas) {
            throw new Error('No canvas element found');
        }

        this.ctx = canvas.getContext('2d')!;
        if (!this.ctx) {
            throw new Error('Unable to get 2D context');
        }

        this.ctx = canvas.getContext('2d')!;
        this.gameBlocksMap = new GameMap(
            MapWidthByBlocks,
            MapHeightByBlocks,
            BlockSize,
            WaterLevelByBlocks
        );


        this.waterLevelByYCoordinates =
            (this.gameBlocksMap.height - this.gameBlocksMap.waterLevelBlockHeight) * this.gameBlocksMap.blockSize;

        this.mapWidthByCoordinates = MapWidthByBlocks * this.gameBlocksMap.blockSize;


        this.gameRunning = false;

        this.gameLogic = new GameLogic();
        this.gameDisplay = new GameDisplay();

        this.airPlaneController = new AirplaneController();
        this.parachutistController = new ParachutistController();

        // Note:
        // Would've moved to a method since it's a bit complex for the sake of composition,
        // but typescript wants the initiation in the constructor
        // and I don't know how your tsconfig.json looks like so if I want to make sure it compiles,
        // I'll leave it like that
        const xCoordinateMiddleMap = (MapWidthByBlocks / 2) * this.gameBlocksMap.blockSize;
        this.boatController = new BoatController(
            {
                xCoordinate: xCoordinateMiddleMap,
                yCoordinate: this.waterLevelByYCoordinates
            },
            BoatSpeedByBlocks * this.gameBlocksMap.blockSize,
            BoatWidthByBlocks * this.gameBlocksMap.blockSize
        );
        this.boatsChosenDirection = EDirection.STAY;

        this.player = new PlayerModel(PlayDefaultScore, PlayerDefaultLives);

        // Note:
        // Didn't bother adding the other drawables such as players and background,
        // but if I would've then redrawScene would've been even simpler
        this.gameDrawers.push(this.airPlaneController);
        this.gameDrawers.push(this.boatController);
        this.gameDrawers.push(this.parachutistController);
    }

    public run(): void {
        this.initialization()
        if (this.gameRunning) {
            if (this.gameRunning) {
                this.gameTickIntervalId = window.setInterval(() => this.gameTick(), GameTickIntervalByMilli);
                this.parachutistCheckIntervalId = window.setInterval(() => this.notifyCriticalParachutists(), PlayTickIntervalByMilli);
            }
        }
    }

    private stopAllIntervals(): void {
        if (this.gameTickIntervalId !== null) {
            window.clearInterval(this.gameTickIntervalId);
            this.gameTickIntervalId = null;
        }
        if (this.parachutistCheckIntervalId !== null) {
            window.clearInterval(this.parachutistCheckIntervalId);
            this.parachutistCheckIntervalId = null;
        }
    }


    private gameTick(): void {
        const planeSpeed: number = PlaneSpeedByBlocks * this.gameBlocksMap.blockSize;
        this.airPlaneController.createAndLaunchAirPlaneIfAirplaneDoesntExist({
                xCoordinate: this.mapWidthByCoordinates,
                yCoordinate: 0
            },
            planeSpeed)


        // Note:
        // Could've done a move-loop similar to what I've done in the drawing,
        // although needed to encapsulate into a strategy with the same signature first
        // (which would've been really cool, but I had a finite time)
        this.airPlaneController.move();
        this.parachutistController.move(this.waterLevelByYCoordinates);
        this.boatController.move(this.mapWidthByCoordinates, this.boatsChosenDirection);
        this.redrawScene();
    }

    // this code does 3 things:
    // 1. listens to parachutist's status this should call 2
    // 2. acts if something did happen this should call 3
    // 3. displays

    //this should be in the controller
    private notifyCriticalParachutists(){
        this.parachutistController.parachutists.forEach((parachutist, index) => {
            const xParachutistCoordinates: number = parachutist.getPosition().xCoordinate;
            const yParachutistCoordinates: number = parachutist.getPosition().yCoordinate;
            const xBoatCoordinates: number = this.boatController.boat.getPosition().xCoordinate;
            const yBoatCoordinates: number = this.boatController.boat.getPosition().yCoordinate;
            const DesiredNewBoatXCoordinates =
                (xBoatCoordinates + this.boatController.boat.getDimensions().xLength);

            if (yParachutistCoordinates >= this.waterLevelByYCoordinates) {
                if (yParachutistCoordinates === yBoatCoordinates &&
                    xParachutistCoordinates >= xBoatCoordinates &&
                    xParachutistCoordinates <= DesiredNewBoatXCoordinates) {
                        this.eventBoatCaughtParachutist();
                }else{
                    this.eventParachutistDrowned();
                }
                this.parachutistController.parachutists.splice(index, 1);
            }
    }
        )}


    private eventBoatCaughtParachutist(){
        this.player.score += PlayerCatchScore;
    }
    private eventParachutistDrowned():void{
        this.player.lives--;
        if (this.player.lives <= 0) {
            this.checkIsGameOverAndActIfSo();
        }
    }

    //this should listen to eventParachutistDrowned
    private checkIsGameOverAndActIfSo():void{
        this.logicGameOver();
        this.displayGameOver();
    }

    private logicGameOver(): void{
        this.stopAllIntervals();
    }

    private displayGameOver(): void {
        // Clear the entire canvas
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // Set styles for the game over screen
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)'; // Semi-transparent black background
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Text settings
        this.ctx.fillStyle = '#FFFFFF'; // White text color
        this.ctx.font = '36px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        // Draw the text in the center of the canvas
        this.ctx.fillText('Game Over', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Final Score: ${this.player.score}`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 40);
    }

    // maybe draw every keydown / keyup
    private initialization() {
        this.gameRunning = true;
        this.airPlaneController.start();
        this.airPlaneController.addDispatchedParachutistListener(this.onParachutistDispatched.bind(this));
        //can draw initial scene, didn't find it relevant

        setInterval(this.notifyCriticalParachutists.bind(this), PlayTickIntervalByMilli);
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    private onParachutistDispatched(planeXCoordinate: number, planeYCoordinate: number) {
        this.parachutistController.spawnParachutist(planeXCoordinate, planeYCoordinate,
            ParachutistsSpeedByBlocks * this.gameBlocksMap.blockSize);
    }

    private handleKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
                this.boatController.move(this.mapWidthByCoordinates, EDirection.LEFT)
                this.redrawScene();
                break;
            case "ArrowRight":
                this.boatController.move(this.mapWidthByCoordinates, EDirection.RIGHT)
                this.redrawScene();
                break;
        }
    }

    private handleKeyUp(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
            case "ArrowRight":
                this.boatController.move(this.mapWidthByCoordinates, EDirection.STAY)
                this.redrawScene();
                // this.boatsChosenDirection = EDirection.STAY;  // Stop moving when the keys are released
                break;
        }
    }

    private redrawScene() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // Clear the canvas for the new frame


        this.gameBlocksMap.draw(this.ctx);
        this.player.draw(this.ctx);

        //Note: So cool
        this.gameDrawers.forEach((gameDrawer)=> gameDrawer.draw(this.ctx))

    }
}
