import { vw, vh } from "./../common/constants";
import { context } from "./../common/canvas";
import { generateGradient, generateColor } from "./../common/material";


export class Target {
    constructor(id) {
        this.id = id;
        this.x = Math.random() * vw;
        this.y = Math.random() * vh / 2;
        this.radius = 8 + Math.random() * 10;
        this.fillColor = generateColor();
        this.fillGradient = generateGradient({
            x: this.x,
            y: this.y,
            radius: this.radius,
            fillColor: this.fillColor
        });

        this.render();
    }

    render() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.fillGradient;
        context.fill();
    }
}
