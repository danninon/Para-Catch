import {AirPlaneModel} from "../../Data/Models/AirPlaneModel.js";
import {AirplaneDisplay} from "./AirplaneDisplay.js";
import {ParachutistScheduler} from "./ParachutistScheduler.js";
import {Position} from "../../Data/Models/Utils/Position.js";
import {IDisplayTwoDimensions} from "../IDisplayTwoDimensions.js";
import {IGameDrawer} from "../IGameDrawer.js";
import {parachutistMaxRandomInterval, parachutistMinimalInterval} from "../../Configuration/GameConfigurations.js";


type EventListener = (x: number, y: number) => void;

export class AirplaneController implements IGameDrawer {

    private _airplane: AirPlaneModel | null = null;
    private display: IDisplayTwoDimensions;
    private scheduler: ParachutistScheduler;
    private eventDispatchedListeners: EventListener[]

    constructor() {
        this._airPlaneExists = false;
        this.eventDispatchedListeners = [];
        this.display = new AirplaneDisplay();

        this.scheduler = new ParachutistScheduler(parachutistMinimalInterval, parachutistMaxRandomInterval, () => {
            if (this._airplane) {
                this.dispatchParachutist(
                    this._airplane.getPosition()
                );
            }
        });
    }

    private _airPlaneExists: boolean;

    get airPlaneExists(): boolean {
        return this._airPlaneExists;
    }

    set airPlaneExists(value: boolean) {
        this._airPlaneExists = value;
    }

    public addDispatchedParachutistListener(listener: EventListener): void {
        this.eventDispatchedListeners.push(listener);
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

    public move(): void {
        if (this.airPlaneExists && this._airplane) {
            const airPlanePosition: Position = this._airplane.getPosition();

            airPlanePosition.xCoordinate -= this._airplane.getSpeed();
            if (airPlanePosition.xCoordinate < 0) {
                this.removeAirPlane();
            }
        }
    }

    public createAndLaunchAirPlaneIfAirplaneDoesntExist(positionByCoordinates: Position, speedByCoordinates: number) {
        if (!this.airPlaneExists) {
            this._airplane = new AirPlaneModel(positionByCoordinates, speedByCoordinates);
            this._airPlaneExists = true;
            this.scheduler.start();
        }
    }

    private dispatchParachutist(position: Position): void {
        this.eventDispatchedListeners.forEach(listener => listener(
            position.xCoordinate,
            position.yCoordinate)
        );

    }

    private removeAirPlane() {
        this.airPlaneExists = false;
    }

}