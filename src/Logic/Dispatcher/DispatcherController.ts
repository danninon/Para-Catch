export interface DispatcherController {
    DispatchCatchable() : void; //put min interval
    StartDispatcher(x: number, y: number, speed: number) : void;
    //dispatchDispatcher (sort of factory)
}