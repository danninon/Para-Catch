import {PlayerModel} from "../../Data/Models/PlayerModel.js";
import {GameMap} from "../../Data/Models/GameMap/GameMap.js";
import {IGameDrawer} from "../IGameDrawer.js";

export class GameDisplay {
    private readonly ctx: CanvasRenderingContext2D;
    private gameDrawers: IGameDrawer[];

    constructor(gameDrawers: IGameDrawer[]) {
        const canvas = document.querySelector('canvas'); // Selects the first canvas element
        if (!canvas) {
            throw new Error('No canvas element found');
        }

        this.ctx = canvas.getContext('2d')!;
        if (!this.ctx) {
            throw new Error('Unable to get 2D context');
        }

        this.ctx = canvas.getContext('2d')!;
        this.gameDrawers = gameDrawers;
    }

    // Note: these properties should go to GameConfigurations
    public displayGameOver(player: PlayerModel): void {
        // Clear the entire canvas
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // Set styles for the game over screen
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)'; // Semi-transparent black background
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Text settings
        this.ctx.fillStyle = '#FFFFFF'; // White text color
        this.ctx.font = '36px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        // Draw the text in the center of the canvas
        this.ctx.fillText('Game Over', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Final Score: ${player.score}`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 40);
    }

    public redrawScene(gameBlocksMap: GameMap, player: PlayerModel) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // Clear the canvas for the new frame
        gameBlocksMap.draw(this.ctx);
        player.draw(this.ctx);

        //Note: So cool
        this.gameDrawers.forEach((gameDrawer) => gameDrawer.draw(this.ctx))

    }
}
