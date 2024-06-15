export class ParachutistScheduler {
    private lastDispatchTime: Date;
    private fixedInterval: number;
    private randomIntervalRange: number;
    private dispatchFunction: () => void;

    constructor(fixedInterval: number, randomIntervalRange: number, dispatchFunction: () => void) {
        this.fixedInterval = fixedInterval;
        this.randomIntervalRange = randomIntervalRange;
        this.lastDispatchTime = new Date(); // Initialize last dispatch time
        this.dispatchFunction = dispatchFunction;

    }

    public start(){
        this.scheduleNextDispatch();
    }

    private scheduleNextDispatch(): void {
        const now = new Date();
        const timeSinceLastDispatch = now.getTime() - this.lastDispatchTime.getTime();
        const minimumInterval = this.fixedInterval + Math.random() * this.randomIntervalRange;

        if (timeSinceLastDispatch < minimumInterval) {
            console.log("Not enough time has passed since the last dispatch. Waiting more...");
            setTimeout(() => {
                this.scheduleNextDispatch(); // Try scheduling again after a short delay
            }, 100); // Check again after 500 milliseconds
            return;
        }

        console.log("Scheduling next dispatch:", minimumInterval);
        setTimeout(() => {
            this.dispatchFunction();  // Execute the dispatch function
            this.lastDispatchTime = new Date();  // Update the last dispatched time
            this.scheduleNextDispatch();  // Recursively schedule the next dispatch
        }, minimumInterval - timeSinceLastDispatch); // Adjust for already elapsed time
    }
}
