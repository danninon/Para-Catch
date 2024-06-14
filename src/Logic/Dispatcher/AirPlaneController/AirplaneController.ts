import {AirPlaneModel} from "../../../Data/Models/AirPlaneModel.js";
import {DispatcherController} from "../DispatcherController";

import {DispatcherDisplay} from "./AirplaneDisplay.js";


type EventListener = (x: number, y: number) => void;

export class AirplaneController {

    get airPlaneExists(): boolean {
        return this._airPlaneExists;
    }

    set airPlaneExists(value: boolean) {
        this._airPlaneExists = value;
    }
    private _airplane: AirPlaneModel | null = null;
    private display: DispatcherDisplay | null = null;
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
        // this.airplaneDispatcher = new AirplaneDispatcher(500); //todo, how does it get map-width?
        // this.parachutistsDispatcher = new ParachutistsDispatcher(); // Start dispatching automatically
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
                this.dispatchParachutist(this._airplane.xCoordinate, this._airplane.yCoordinate);

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

    // private StartDispatchingParachutists(): void{
    //     this.parachutistsDispatcher.start()
    // }


    //move to display
    // public DispatchCatchable(): void {
    //   this.parachutistsDispatcher.dispatchParachutist();
    // }

    // public StartDispatcher(x: number, y: number, speed: number) {
    //     this.setAirplaneModel(x,y,speed)
    // }

    // Create or update the single airplane
    public move(maxWidthPixels: number): void {
        if (this.airPlaneExists && this._airplane) {
            this._airplane.xCoordinate += this._airplane.speed;
            // Check if the airplane has moved past the last tile
            if (this._airplane.xCoordinate > maxWidthPixels) {
                this.removeAirPlane();
            }
        }
    }

    public createAndLaunchAirPlane(x: number, y: number, speed: number){
        this._airplane = new AirPlaneModel(x,y,speed);
        this._airPlaneExists = true;
        this.start();
    }

    private removeAirPlane(){
        this.airPlaneExists = false;
    }
    // Get the current airplane

    public draw(ctx: CanvasRenderingContext2D): void {
        if (this._airplane) {
            this._airplane.draw(ctx);
        }
    }
    // Optional: Clear the current airplane
    // private clearAirplane(): void {
    //     this.airplane = null;
    // }



    // Update the position of the airplane
    // public updateAirplaneLocation(deltaTime: number): void {
    //     if (this.airplane) {
    //         this.airplane.move(deltaTime);
    //         console.log(`Airplane at (${this.airplane.xCoordinate}, ${this.airplane.yCoordinate}) with speed ${this.airplane.speed}`);
    //     } else {
    //         console.log("No airplane is set.");
    //     }
    // }

}