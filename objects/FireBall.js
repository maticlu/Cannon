import { vw, vh, COLOR_FIRE } from "./../common/constants";
import { context } from "./../common/canvas";
import { REMOVE_FIREBALL } from "./../common/events";
import { generateGradient } from "./../common/material";


export class FireBall {
    constructor(angle, id) {
        this.id = id;
        this.angle = angle;
        this.radius = 5;
        this.x = vw / 2 - 50;
        this.y = vh;
        this.speedX = 10;
        this.speedY = 10;
        this.render();
    }

    checkIfOutsideCanvas() {
        if (this.y < 0) {
            REMOVE_FIREBALL(this.id);
        }

        if (this.x <= 0 || this.x >= vw) {
            this.speedX = -this.speedX;
        }
    }

    render() {
        this.checkIfOutsideCanvas();

        this.x += Math.sin(this.angle) * this.speedX;
        this.y -= Math.cos(this.angle) * this.speedY;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = generateGradient({
            x: this.x,
            y: this.y,
            radius: this.radius,
            fillColor: COLOR_FIRE
        })
        context.fill();
    }
}
