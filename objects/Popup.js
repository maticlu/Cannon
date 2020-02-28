import { context } from "./../common/canvas";
import { vw, vh, BUTTON_HEIGHT, BUTTON_SPACE } from "./../common/constants";

import { MainMenu } from "./MainMenu";

export class Popup extends MainMenu {
    constructor(buttonConfiguration) {
        super();
        this.config = buttonConfiguration;
        this.calculatePosition(); // Sets x, y, width, height
        this.buttons = [];
        this.addButtons();
        this.active = false;
    }

    calculatePosition() {
        this.width = 400;
        this.x = (vw - this.width) / 2;
        this.height = BUTTON_HEIGHT * 2 + this.config.buttons.length * (BUTTON_HEIGHT + BUTTON_SPACE);
        this.y = (vh - this.height) / 2;
    }


    background() {
        context.beginPath();
        context.fillStyle = "rgba(100,100,100, 0.3)";
        context.fillRect(this.x, this.y, this.width, this.height);
        context.stroke();
    }

    render() {
        if (!this.active) return;
        this.background();
        this.buttons.forEach((button) => button.render());
        window.requestAnimationFrame(this.render.bind(this));
    }
}