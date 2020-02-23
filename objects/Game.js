import { Cannon } from "./Cannon";
import { Target } from "./Target";
import { Stats } from "./Stats";
import { Environment } from "./Environment";
import { Explosion } from "./Explosion";
import { clearContext, canvas, context } from "./../common/canvas";
import { FireBall } from "./FireBall";
import { collisionLoop } from "./../common/collision";


export class Game {
    constructor(targets = 1) {
        this.cannon;
        this.stats;
        this.targets = [];
        this.fireballs = [];
        this.explosions = [];
        this.numberOfTargets = targets;
        this.targetId = 1;
        this.fireballId = 1;
        this.explosionId = 1;

        this.renderBasicObjects();
        this.registerEvents();
        this.start();
    }

    renderBasicObjects() {
        this.stats = new Stats();
        this.environment = new Environment();
        this.renderTargets();
        this.cannon = new Cannon();
    }

    registerEvents() {
        document.addEventListener("fire", (e) => {
            this.fireballs.push(new FireBall(e.detail, this.fireballId));
            this.fireballId += 1;
        });

        document.addEventListener("removefireball", (e) => {
            const fireballIndex = this.fireballs.findIndex(fireball => fireball.id === e.detail);
            this.fireballs.splice(fireballIndex, 1);
        });

        document.addEventListener("removetarget", (e) => {
            const targetIndex = this.targets.findIndex(target => target.id === e.detail);
            this.targets.splice(targetIndex, 1);
        });

        document.addEventListener("removeexplosion", (e) => {
            const explosionIndex = this.explosions.findIndex(explosion => explosion.id === e.detail);
            this.explosions.splice(explosionIndex, 1);
        });

        document.addEventListener("createparticles", (e) => {
            this.explosions.push(new Explosion(e.detail, this.explosionId));
            this.explosionId += 1;
        });
    }

    renderTargets() {
        let i = 0;
        for (i; i < this.numberOfTargets; i++) {
            this.targets.push(new Target(this.targetId));
            this.targetId++;
        }
    }

    start() {
        this.refresh();
    }

    renderDynamics() {
        this.targets.forEach(target => target.render());
        this.fireballs.forEach(fireball => fireball.render());
        this.explosions.forEach(explosion => explosion.render());
    }

    refresh() {
        clearContext();
        collisionLoop(this.fireballs, this.targets);
        this.environment.render();
        this.renderDynamics();
        this.cannon.render();
        this.stats.render();
        window.requestAnimationFrame(this.refresh.bind(this));
    }
}