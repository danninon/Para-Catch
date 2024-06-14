import {GameBlock} from "./GameBlock.js";

export class GameMap {
    get waterLevelBlockHeight(): number {
        return this._waterLevelBlockHeight;
    }
    private _waterLevelBlockHeight: number;

    get height(): number {
        return this._height;
    }
    get blockSize(): number {
        return this._blockSize;
    }
    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }
    private _width: number;
    private _height: number;
    private blocks: GameBlock[][];
    private _blockSize: number;

    constructor(width: number = 10, height: number = 10, blockSize: number = 50, waterLevelHeight: number) {
        this._width = width;
        this._height = height;
        this._blockSize = blockSize;
        this._waterLevelBlockHeight = waterLevelHeight;
        this.blocks = [];
        this.initializeBlocks();
    }

    private initializeBlocks(): void {
        for (let y = 0; y < this._height; y++) {
            this.blocks[y] = [];
            for (let x = 0; x < this._width; x++) {
                let type = 'air';
                if (y === this._height-this.waterLevelBlockHeight) {
                    type = 'sea'; // Sea level blocks
                }

                this.blocks[y][x] = new GameBlock(type);
            }
        }
    }

    getBlock(x: number, y: number): GameBlock {
        if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
            return this.blocks[y][x];
        } else {
            throw new Error('Block coordinates out of bounds.');
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (let y = 0; y < this._height; y++) {
            for (let x = 0; x < this._width; x++) {
                this.blocks[y][x].draw(ctx, x * this._blockSize, y * this._blockSize, this._blockSize);
            }
        }
    }
}
