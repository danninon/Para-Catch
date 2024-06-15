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



export class GameController {
    private readonly waterLevelByYCoordinates: number; //this could be better represented by function
    private readonly mapWidthByCoordinates: number; //this could be better represented by function

    private gameDisplay:GameDisplay;


    private player: PlayerModel;
    private gameRunning: boolean;

    private airPlaneController: AirplaneController;
    private parachutistController: ParachutistController;
    private boatController: BoatController;
    private boatsChosenDirection: EDirection;

    private gameTickIntervalId: number | null = null;
    private parachutistCheckIntervalId: number | null = null;

    private gameBlocksMap: GameMap;



    constructor() {

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
        const gameDrawers:IGameDrawer[] = [
            this.airPlaneController,
            this.boatController,
            this.parachutistController
        ]


        this.gameDisplay = new GameDisplay(gameDrawers);
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
        this.gameDisplay.redrawScene(this.gameBlocksMap,this.player);
    }



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
                const isParachutistCaught = yParachutistCoordinates === yBoatCoordinates &&
                    xParachutistCoordinates >= xBoatCoordinates &&
                    xParachutistCoordinates <= DesiredNewBoatXCoordinates

                isParachutistCaught ? this.eventBoatCaughtParachutist() : this.eventParachutistDrowned();
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
        this.gameDisplay.displayGameOver(this.player);
    }

    private logicGameOver(): void{
        this.stopAllIntervals();
        this.gameRunning = false;
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
        if (this.gameRunning) {
            switch (event.key) {
                case "ArrowLeft":
                    this.boatController.move(this.mapWidthByCoordinates, EDirection.LEFT)
                    this.gameDisplay.redrawScene(this.gameBlocksMap, this.player);
                    break;
                case "ArrowRight":
                    this.boatController.move(this.mapWidthByCoordinates, EDirection.RIGHT)
                    this.gameDisplay.redrawScene(this.gameBlocksMap, this.player);
                    break;
            }
        }
    }
    private handleKeyUp(event: KeyboardEvent): void {
        if (this.gameRunning) {
            switch (event.key) {
                case "ArrowLeft":
                case "ArrowRight":
                    this.boatController.move(this.mapWidthByCoordinates, EDirection.STAY)
                    this.gameDisplay.redrawScene(this.gameBlocksMap, this.player);
                    break;
            }
        }
    }

}
