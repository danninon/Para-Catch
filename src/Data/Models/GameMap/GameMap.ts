import {GameBlock} from "./GameBlock.js";
import {pathImageBackGround, pathImageSea} from "../../../Configuration/GameConfigurations.js";

export class GameMap {
    private seaImage: HTMLImageElement;
    private backgroundImage: HTMLImageElement;
    private blocks: GameBlock[][];
    private readonly _waterLevelBlockHeight: number;
    private readonly _height: number;
    private readonly _blockSize: number;

    constructor(width: number = 10, height: number = 10, blockSize: number = 50, waterLevelHeight: number) {
        this._width = width;
        this._height = height;
        this._blockSize = blockSize;
        this._waterLevelBlockHeight = waterLevelHeight;
        this.blocks = [];
        this.initializeBlocks();

        this.seaImage = new Image();
        this.backgroundImage = new Image();
        this.seaImage.src = pathImageSea;
        this.backgroundImage.src = pathImageBackGround;
    }

    get waterLevelBlockHeight(): number {
        return this._waterLevelBlockHeight;
    }

    private _width: number;

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    get blockSize(): number {
        return this._blockSize;
    }

    getBlock(x: number, y: number): GameBlock {
        if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
            return this.blocks[y][x];
        } else {
            throw new Error('Block coordinates out of bounds.');
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.backgroundImage.complete) {
            ctx.drawImage(
                this.backgroundImage,
                0,
                0,
                this._width * this._blockSize,
                this._height * this._blockSize
            );
        }
        if (this.seaImage.complete) {
            const seaLevelY = (this._height - this._waterLevelBlockHeight) * this._blockSize;
            ctx.drawImage(
                this.seaImage,
                0,
                seaLevelY,
                this._width * this._blockSize,
                this._blockSize * this._waterLevelBlockHeight
            );
        }
    }

    private initializeBlocks(): void {
        for (let y = 0; y < this._height; y++) {
            this.blocks[y] = [];
            for (let x = 0; x < this._width; x++) {
                let type = 'air';
                if (y === this._height - this.waterLevelBlockHeight) {
                    type = 'sea'; // Sea level blocks
                }

                this.blocks[y][x] = new GameBlock(type);
            }
        }
    }
}
