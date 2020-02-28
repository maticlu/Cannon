import { Cannon } from "./Cannon";
import { Target } from "./Target";
import { Stats } from "./Stats";
import { Environment } from "./Environment";
import { Explosion } from "./Explosion";
import { Popup } from "./Popup";
import { FireBall } from "./FireBall";
import { collisionLoop } from "./../common/collision";
import { KEY_ESC, FONT } from "../common/constants";
import { newCustomEvent } from "../common/events";
import { clearContext, context } from "./../common/canvas";

export class Game {
    constructor(targets = 1) {
        this.timer = new Date();
        this.availableTime = 60;
        this.cannon;
        this.stats;
        this.targets = [];
        this.fireballs = [];
        this.explosions = [];
        this.numberOfTargets = targets;
        this.targetId = 1;
        this.fireballId = 1;
        this.explosionId = 1;
        this.active = false;
        this.eventListener = {};
        this.popupButtons = {
            buttons: [
                {
                    text: "Resume",
                    event: "resumegame",
                },
                {
                    text: "Exit",
                    event: "exitgame",
                }
            ]
        };
        this.popup = new Popup(this.popupButtons);

    }

    renderBasicObjects() {
        this.environment = new Environment();
        this.stats = new Stats();
        this.cannon = new Cannon();
    }

    fireEvent(event) {
        this.fireballs.push(new FireBall(event.detail, this.fireballId));
        this.fireballId += 1;
    }

    removeFireballEvent(event) {
        const fireballIndex = this.fireballs.findIndex(fireball => fireball.id === event.detail);
        this.fireballs.splice(fireballIndex, 1);
    }

    removeTargetEvent(event) {
        const targetIndex = this.targets.findIndex(target => target.id === event.detail);
        this.targets.splice(targetIndex, 1);
    }

    removeExplosionEvent(event) {
        const explosionIndex = this.explosions.findIndex(explosion => explosion.id === event.detail);
        this.explosions.splice(explosionIndex, 1);
    }

    createParticlesEvent(event) {
        this.explosions.push(new Explosion(event.detail, this.explosionId));
        this.explosionId += 1;
    }

    pauseGameEvent(event) {
        if (event.keyCode === KEY_ESC) newCustomEvent("pausegame");
    }

    registerEvents() {
        this.eventListener.pause = this.pauseGameEvent.bind(this);
        this.eventListener.fire = this.fireEvent.bind(this);
        this.eventListener.removeFireball = this.removeFireballEvent.bind(this);
        this.eventListener.removeTarget = this.removeTargetEvent.bind(this);
        this.eventListener.removeExplosion = this.removeExplosionEvent.bind(this);
        this.eventListener.createParticles = this.createParticlesEvent.bind(this);


        document.addEventListener("fire", this.eventListener.fire);
        document.addEventListener("removefireball", this.eventListener.removeFireball);
        document.addEventListener("removetarget", this.eventListener.removeTarget);
        document.addEventListener("removeexplosion", this.eventListener.removeExplosion);
        document.addEventListener("createparticles", this.eventListener.createParticles);
        document.addEventListener("keydown", this.eventListener.pause);
    }

    removeEvents() {
        document.removeEventListener("fire", this.eventListener.fire);
        document.removeEventListener("removefireball", this.eventListener.removeFireball);
        document.removeEventListener("removetarget", this.eventListener.removeTarget);
        document.removeEventListener("removeexplosion", this.eventListener.removeExplosionEvent);
        document.removeEventListener("createparticles", this.eventListener.createParticlesEvent);
        document.removeEventListener("keydown", this.eventListener.pause);
    }

    start(playerName) {
        this.registerEvents();
        this.renderBasicObjects();
        this.stats.setPlayerName(playerName);
        this.renderTargets();
        this.timer = new Date();
        this.popup.removeEvents();
        this.active = true;
        this.render();
    }

    stop() {
        this.active = false;
        this.removeEvents();
        this.popup.active = true;
        this.popup.render();
        this.popup.registerEvents();
        document.body.style.cursor = "cursor";
    }

    end() {
        this.active = false;
        document.body.style.cursor = "cursor";
    }

    reset() {
        clearContext();
        this.active = false;
        this.removeEvents();
        this.targets = [];
        this.fireballs = [];
        this.explosions = [];
        this.cannon.reset();
        this.renderScore();
        document.body.style.cursor = "cursor";
    }

    gameStateToggle() {
        this.active ? this.stop() : this.start();
    }


    clock() {
        const current = new Date();
        const time = this.availableTime - ((current - this.timer) / 1000);
        context.font = "bold 30px " + FONT;
        context.fillStyle = "white";
        context.fillText(time.toFixed(0), 100, 100);
        if (time <= 0.02) {
            newCustomEvent("finishgame");
        }
    }

    renderDynamics() {
        this.targets.forEach(target => target.render());
        this.fireballs.forEach(fireball => fireball.render());
        this.explosions.forEach(explosion => explosion.render());
    }

    renderTargets() {
        let i = 0;
        for (i; i < this.numberOfTargets; i++) {
            this.targets.push(new Target(this.targetId));
            this.targetId++;
        }
    }

    renderScore() {
        clearContext();
        this.environment.render();
        this.stats.render(true);
    }

    render() {
        if (!this.active) return false;
        document.body.style.cursor = 'none';
        clearContext();
        collisionLoop(this.fireballs, this.targets);
        this.environment.render();
        this.renderDynamics();
        this.cannon.render();
        this.stats.render();
        this.clock();
        window.requestAnimationFrame(this.render.bind(this));
    }
}