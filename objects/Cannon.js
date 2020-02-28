import { vw, vh, KEY_LEFT, KEY_RIGHT, KEY_SPACE } from "../common/constants";
import { context, clearContext } from "../common/canvas";
import { toRad } from "../common/convert";
import cannonImage from "./../assets/Cannon.png";
import { EVENT_FIRE } from "../common/events";

export class Cannon {
    constructor() {
        this.image = new Image();
        this.image.src = cannonImage;
        this.rotation = 0;
        this.speed = 2;
        this.time = 0;
        this.x = (vw / 2 - 50);
        this.y = (vh);
        this.mouseX = 0;
        this.mouseY = 0;
        this.registerEvents();
        this.image.onload = () => {
            this.render();
        };
    }
    registerEvents() {
        document.addEventListener("click", (event) => {
            this.fire();
        });
        document.addEventListener("mousemove", (event) => {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
            const sizeX = this.x - this.mouseX;
            const sizeY = this.y - this.mouseY;
            const angle = Math.atan2(sizeY, sizeX) - Math.PI / 2;
            this.rotation = angle;
        });
    }
    fire() {
        EVENT_FIRE(this.rotation);
    }

    reset() {
        this.rotation = 0;
    }
    render() {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        context.drawImage(this.image, -50, -100, 100, 200);
        context.restore();

    }
}
