import { context } from "../common/canvas";
import { EXPLOSION_TIME } from "./../common/constants";
import { generateGradient, generateColor } from "./../common/material";


export class Particle {
    constructor(coordinatesAndColor, angle, id) {
        this.id = id;
        this.x = coordinatesAndColor.x;
        this.y = coordinatesAndColor.y;
        this.color = coordinatesAndColor.color;
        this.radius = 4 + Math.random() * 3;

        this.gradient = generateGradient({
            x: this.x,
            y: this.y,
            radius: this.radius,
            fillColor: this.color
        });


        this.angle = angle;
        this.speedX = 10;
        this.speedY = 10;
        this.render();
        this.time = new Date();
    }

    updateGradient() {
        this.gradient = generateGradient({
            x: this.x,
            y: this.y,
            radius: this.radius,
            fillColor: this.color
        });
    }

    render() {
        this.x += Math.sin(this.angle) * this.speedX;
        this.y += Math.cos(this.angle) * this.speedY;
        this.updateGradient();

        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.gradient;
        context.fill();

    }
}
