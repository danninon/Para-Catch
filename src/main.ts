import {GameController} from "./Logic/Game/GameController.js";

document.addEventListener('DOMContentLoaded', () => {
    try {
        const gameController = new GameController();
        gameController.run();
    } catch (error) {
        console.error('Failed to initialize the game:', error);
    }
});