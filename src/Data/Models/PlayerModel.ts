export class PlayerModel {
    get lives(): number {
        return this._lives;
    }

    set lives(value: number) {
        this._lives = value;
    }
    get score(): number {
        return this._score;
    }

    set score(value: number) {
        this._score = value;
    }
    // Existing properties...

    private _score: number = 0;
    private _lives: number = 3;

   constructor(score: number, lives: number) {
       this.lives = lives;
       this.score = score;
   }

    public draw(ctx: CanvasRenderingContext2D): void {
        const padding = 10;
        const scoreText = `Score: ${this.score}`;
        const livesText = `Lives: ${this.lives}`;

        ctx.fillStyle = 'black';  // Choose a text color that fits your game's theme
        ctx.font = '16px Arial';  // Set the font size and family

        // Calculate positions to ensure the text is visible, adjust as necessary
        ctx.fillText(scoreText, padding, 20);
        ctx.fillText(livesText, ctx.canvas.width - ctx.measureText(livesText).width - padding, 20);
    }
}