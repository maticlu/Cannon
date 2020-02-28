import { context } from "./../common/canvas";
import { FONT, BUTTON_HEIGHT, vw, BUTTON_SPACE } from "./../common/constants";
import { BUTTON_HOVER, BUTTON_NOHOVER, BUTTON_CLICK } from "./../common/events";


export class Button {
    constructor(config) {
        this.config = config;
        this.width = 250;
        this.border = 3;
        this.positionLeft = this.config.coordinates.x + this.config.coordinates.width / 2 - this.width / 2;
        this.positionTop = this.config.coordinates.y + BUTTON_HEIGHT + this.config.id * (BUTTON_HEIGHT + BUTTON_SPACE);
        this.textHeight = 30;
        this.textTop = this.positionTop + this.textHeight + 5;

        this.color = "white";

        this.font = "bold " + this.textHeight + "px " + FONT;
        this.setButtonLimits();
        this.registerEvents();
    }

    setButtonLimits() {
        this.minX = this.positionLeft - this.border;
        this.maxX = this.positionLeft + this.width;
        this.minY = this.positionTop;
        this.maxY = this.positionTop + BUTTON_HEIGHT;
    }

    registerEvents() {
        document.addEventListener("mousemove", (event) => {
            this.hover(event);
        });
        document.addEventListener("click", (event) => {
            this.click(event);
        });
    }
    click(event) {
        if (this.hover(event)) {
            BUTTON_CLICK(this.config.id, this.config.listen, this.config.event);
        }
    }
    hover() {
        const x = event.clientX;
        const y = event.clientY;
        if (x > this.minX && x < this.maxX && y > this.minY && y < this.maxY) {
            this.color = "yellow";
            BUTTON_HOVER(this.config.id, this.config.listen);
            return true;
        }
        else {
            this.color = "white";
            BUTTON_NOHOVER(this.config.id, this.config.listen);
            return false;
        }
    }

    render() {
        // Border around text
        context.beginPath();
        context.fillStyle = "transparent";
        context.rect(this.positionLeft, this.positionTop, 250, BUTTON_HEIGHT);
        context.strokeStyle = this.color;
        context.lineWidth = this.border;
        context.stroke();
        context.fill();

        // Button text
        context.font = this.font;
        const textSize = context.measureText(this.config.text);
        context.fillStyle = this.color;
        context.fillText(this.config.text, vw / 2 - textSize.width / 2, this.textTop);
    }
}