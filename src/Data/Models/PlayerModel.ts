import {
    playerTextBoxFillColor,
    playerTextBoxFont,
    playerTextBoxYLength,
    playTextBoxPadding
} from "../../Configuration/GameConfigurations.js";

export class PlayerModel {
    constructor(score: number, lives: number) {
        this._lives = lives;
        this._score = score;
    }

    private _score: number = 0;

    get score(): number {
        return this._score;
    }

    set score(value: number) {
        this._score = value;
    }

    private _lives: number = 0;

    get lives(): number {
        return this._lives;
    }

    set lives(value: number) {
        this._lives = value;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        const padding = playTextBoxPadding;
        const scoreText = `Score: ${this._score}`;
        const livesText = `Lives: ${this._lives}`;
        ctx.fillStyle = playerTextBoxFillColor;  // Choose a text color that fits your game's theme
        ctx.font = playerTextBoxFont;  // Set the font size and family
        ctx.fillText(scoreText, padding, playerTextBoxYLength);
        ctx.fillText(livesText, ctx.canvas.width - ctx.measureText(livesText).width - padding, playerTextBoxYLength);
    }
}