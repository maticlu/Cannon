import { context } from "../common/canvas";
import { toRad } from "./../common/convert";
import { Particle } from "./Particle";
import { REMOVE_EXPLOSION } from "../common/events";
import { EXPLOSION_TIME } from "../common/constants";

export class Explosion {
    constructor(coordinatesAndColor, id) {
        this.id = id;
        this.coordinatesAndColor = coordinatesAndColor;
        this.particles = [];
        this.explosionCreated = new Date();
        this.createParticles();
        this.render();
    }

    createParticles() {
        for (let i = 1; i <= 12; i++) {
            this.particles.push(new Particle(this.coordinatesAndColor, toRad(30) * i));
        }
    }

    render() {
        const currentRenderTime = new Date();
        if (currentRenderTime - this.explosionCreated > EXPLOSION_TIME) {
            REMOVE_EXPLOSION(this.id);
        }
        this.particles.forEach(particle => particle.render());
    }
}
