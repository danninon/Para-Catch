export class GameBlock {
    private type: string;  // For example, 'air', 'sea', or 'ground'

    constructor(type: string) {
        this.type = type;
    }

    getType(): string {
        return this.type;
    }
}
