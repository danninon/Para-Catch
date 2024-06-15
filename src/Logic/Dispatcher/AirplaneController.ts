import {AirPlaneModel} from "../../Data/Models/AirPlaneModel.js";
import {AirplaneDisplay} from "./AirplaneDisplay.js";
import {ParachutistScheduler} from "./ParachutistScheduler.js";
import {Position} from "../../Data/Models/Utils/Position.js";
import {IDisplayTwoDimensions} from "../IDisplayTwoDimensions.js";
import {IGameDrawer} from "../IGameDrawer";


type EventListener = (x: number, y: number) => void;

export class AirplaneController implements IGameDrawer {

    get airPlaneExists(): boolean {
        return this._airPlaneExists;
    }

    set airPlaneExists(value: boolean) {
        this._airPlaneExists = value;
    }
    private _airplane: AirPlaneModel | null = null;
    private display: IDisplayTwoDimensions;

    private _airPlaneExists: boolean;
    private lastDispatchedParachutist: Date | null = null;

    private scheduler: ParachutistScheduler;
    private eventDispatchedListeners: EventListener[]

    private lastDispatchedAirplane: Date | null = null;

    public addDispatchedParachutistListener(listener: EventListener): void {
        console.log("at addDispatchedParachutistListener");
        this.eventDispatchedListeners.push(listener);

        console.log("blahblah: ", this.eventDispatchedListeners);
    }


    // private parachutistsDispatcher: ParachutistsDispatcher;
    //
    // private airplaneDispatcher: AirplaneDispatcher;
    // hold a reference of the map?
    //display


    constructor() {
        this._airPlaneExists = false;
        this.eventDispatchedListeners = [];
        this.display = new AirplaneDisplay();

        this.scheduler = new ParachutistScheduler(1000, 5000,() => {
            if (this._airplane) {
                this.dispatchParachutist(
                    this._airplane.getPosition().xCoordinate,
                    this._airplane.getPosition().yCoordinate
                );
            }
        });
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        if (this._airplane && this._airPlaneExists) {
            // const { xCoordinate, yCoordinate, width, height } = this._airplane; // Assume these properties exist
            this.display.draw(
                ctx,
                this._airplane.getPosition().xCoordinate,
                this._airplane.getPosition().yCoordinate,
                this._airplane.getDimensions().xLength,
                this._airplane.getDimensions().yLength,
            );
        }
    }

    public start(): void {
        console.log('at start of airplanecontroller');
        this.scheduler.start();
        // setInterval(this.parachutistSpawnTimer.bind(this), 1000); //dropping parachutists

    }

    public stop(): void {

    }

    private parachutistSpawnTimer(): void {
        // can dispatch plane
        const now = new Date();
        //if more than one second passed from the last parachutist, call DispatchParachutist()
        // later on change to not constant time
        if (!this.lastDispatchedParachutist || now.getTime() - this.lastDispatchedParachutist.getTime() > 1000) {
            if (this._airplane) {
                this.lastDispatchedParachutist = now; // Update the last dispatched time
                this.dispatchParachutist(
                    this._airplane.getPosition().xCoordinate,
                    this._airplane.getPosition().yCoordinate
                );

            }
        }
    }

    //todo: make this get a position, send a position
    private dispatchParachutist(xCoordinate: number, yCoordinate: number): void {
        console.log("at dispatchParachutist");
        this.eventDispatchedListeners.forEach(listener => listener(xCoordinate, yCoordinate));
        console.log(`Dispatched parachutist at (${xCoordinate}, ${yCoordinate})`);
    }


    public move(): void {
        if (this.airPlaneExists && this._airplane) {
        const airPlanePosition:Position = this._airplane.getPosition();

            airPlanePosition.xCoordinate -= this._airplane.getSpeed();
            // Check if the airplane has moved past the last tile
            if (airPlanePosition.xCoordinate < 0) {
                this.removeAirPlane();
            }
        }
    }

    // todo: start / stop
    public createAndLaunchAirPlaneIfAirplaneDoesntExist(positionByCoordinates: Position, speedByCoordinates: number){
        if (!this.airPlaneExists) {
            this._airplane = new AirPlaneModel(positionByCoordinates, speedByCoordinates);
            this._airPlaneExists = true;
            this.scheduler.start();
        }
    }

    // todo: start / stop
    private removeAirPlane(){
        this.airPlaneExists = false;
    }

}