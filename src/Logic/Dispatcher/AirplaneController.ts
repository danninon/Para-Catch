import {AirPlaneModel} from "../../Data/Models/AirPlaneModel.js";
import {AirplaneDisplay} from "./AirplaneDisplay.js";
import {Position} from "../../Data/Models/Utils/Position";


type EventListener = (x: number, y: number) => void;

export class AirplaneController {

    get airPlaneExists(): boolean {
        return this._airPlaneExists;
    }

    set airPlaneExists(value: boolean) {
        this._airPlaneExists = value;
    }
    private _airplane: AirPlaneModel | null = null;
    private display: AirplaneDisplay;

    private _airPlaneExists: boolean;
    private lastDispatchedParachutist: Date | null = null;
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
        // this.airplaneDispatcher = new AirplaneDispatcher(500); //todo, how does it get map-width?
        // this.parachutistsDispatcher = new ParachutistsDispatcher(); // Start dispatching automatically
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
        setInterval(this.regularUpdate.bind(this), 1000); //dropping parachutists

        //flying new planes
        //moving
    }

    //if there is no airplane create airplane

    public stop(): void {

    }

    private regularUpdate(): void {
        // can dispatch plane
        const now = new Date();
        //if more than one second passed from the last parachutist, call DispatchParachutist()
        // later on change to not constant time
        if (!this.lastDispatchedParachutist || now.getTime() - this.lastDispatchedParachutist.getTime() > 1000) {
            if (this._airplane) {
                this.lastDispatchedParachutist = now; // Update the last dispatched time
                this.dispatchParachutist(
                    this._airplane.getPosition().xCoordinate,
                    this._airplane.getPosition().yCoordinate);

            }
        }
    }



    // Todo: after parachutist was written
    // create parachutist
    // add to array
    // send to display?
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

    public createAndLaunchAirPlane(position: Position, speed: number){
        this._airplane = new AirPlaneModel(position,speed);
        this._airPlaneExists = true;
        this.start();
    }

    private removeAirPlane(){
        this.airPlaneExists = false;
    }

}