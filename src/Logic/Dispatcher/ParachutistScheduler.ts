export class ParachutistScheduler {
    private lastDispatchTime: Date;
    private fixedInterval: number;
    private randomIntervalRange: number;
    private dispatchFunction: () => void;

    constructor(fixedInterval: number, randomIntervalRange: number, dispatchFunction: () => void) {
        this.fixedInterval = fixedInterval;
        this.randomIntervalRange = randomIntervalRange;
        this.lastDispatchTime = new Date();
        this.dispatchFunction = dispatchFunction;
    }

    public start() {
        this.scheduleNextDispatch();
    }

    public stop() {

    }

    private scheduleNextDispatch(): void {
        const now = new Date();
        const timeSinceLastDispatch = now.getTime() - this.lastDispatchTime.getTime();
        const minimumInterval = this.fixedInterval + Math.random() * this.randomIntervalRange;

        if (timeSinceLastDispatch < minimumInterval) {
            setTimeout(() => {
                this.scheduleNextDispatch();
            }, 100);
            return;
        }

        setTimeout(() => {
            this.dispatchFunction();
            this.lastDispatchTime = new Date();
            this.scheduleNextDispatch();  // recursively schedule the next dispatch
        }, minimumInterval - timeSinceLastDispatch);
    }
}
