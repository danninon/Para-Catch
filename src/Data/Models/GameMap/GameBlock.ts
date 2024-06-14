export class GameBlock {
    private type: string;  // For example, 'air', 'sea', or 'ground'

    constructor(type: string) {
        this.type = type;
    }

    getType(): string {
        return this.type;
    }

    draw(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
        ctx.fillStyle = this.type === 'sea' ? 'blue' : 'skyblue';
        ctx.fillRect(x, y, size, size);
    }
}
