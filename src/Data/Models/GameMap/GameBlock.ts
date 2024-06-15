export class GameBlock {
    private type: string;  // for example, 'air', 'sea'

    constructor(type: string) {
        this.type = type;
    }

    getType(): string {
        return this.type;
    }
}
