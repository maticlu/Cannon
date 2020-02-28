import { getStorage } from "../common/storage";
import { Environment } from "./Environment";
import { context, clearContext } from "./../common/canvas";
import { FONT, vw } from "./../common/constants";
import { newCustomEvent } from "./../common/events";
export class Leaderboard {
    constructor() {
        this.data = [];
        this.environment = new Environment;
        this.eventListener = {};
    }

    load() {
        this.data = getStorage();
        this.registerEvents();
    }

    registerEvents() {
        this.eventListener.stop = this.stopEvent.bind(this);
        this.eventListener.stopEsc = this.stopEsc.bind(this);
        document.addEventListener("click", this.eventListener.stop);
        document.addEventListener("keydown", this.eventListener.stopEsc)
    }

    removeEvents() {
        document.removeEventListener("click", this.eventListener.stop);
        document.removeEventListener("keydown", this.eventListener.stopEsc)

    }
    list() {
        context.font = "bold 30px " + FONT;
        context.fillStyle = "white";

        const title = "LEADERBOARD";
        const titleSize = context.measureText(title);

        context.fillText(title, vw / 2 - titleSize.width / 2, 100);

        context.font = "30px " + FONT;
        context.fillStyle = "white";
        this.data.forEach((score, index) => {
            const multiply = index + 1;
            const text = score.score + " - " + score.name;
            const textSize = context.measureText(text);
            context.fillText(text, vw / 2 - textSize.width / 2, 100 + 75 * multiply);
        });
    }

    stopEvent() {
        newCustomEvent("showmainmenu");
    }
    stop() {
        clearContext();
        this.removeEvents();
    }
    stopEsc(event) {
        if (event.keyCode === 27) this.stopEvent();
    }

    render() {
        this.environment.render();
        this.list();
    }
}