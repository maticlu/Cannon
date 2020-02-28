import { Button } from "./Button";
import { clearContext } from "../common/canvas";
import { newCustomEvent } from "../common/events";

export class MainMenu {

    constructor() {
        this.hoverState = [];
        this.eventListener = {};
        if (new.target === MainMenu) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    addButtons() {
        this.config.buttons.forEach((button, index) => {
            this.buttons.push(new Button({
                id: index,
                text: button.text,
                event: button.event,
                listen: this,
                coordinates: {
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height
                }
            }));
        });
    }

    registerEvents() {
        this.eventListener.add = this.addHoverButton.bind(this);
        this.eventListener.remove = this.removeHoverButton.bind(this);
        this.eventListener.click = this.buttonClick.bind(this);
        document.addEventListener("canvasbuttonhover", this.eventListener.add, true);
        document.addEventListener("canvasbuttonnohover", this.eventListener.remove, true);
        document.addEventListener("canvasbuttonclick", this.eventListener.click, true);
    }

    removeEvents() {
        document.removeEventListener("canvasbuttonhover", this.eventListener.add, true);
        document.removeEventListener("canvasbuttonnohover", this.eventListener.remove, true);
        document.removeEventListener("canvasbuttonclick", this.eventListener.click, true);
    }

    checkHoverState() {
        document.body.style.cursor = this.hoverState.length ? "pointer" : "";
    }

    elementHoverExists(id) {
        const elementIndex = this.hoverState.indexOf(id);
        return elementIndex;
    }

    addHoverButton(event) {

        if (event.detail.instance !== this) return false;
        const id = event.detail.id;
        if (this.elementHoverExists(id) > - 1) return false;
        this.hoverState.push(id);
        this.checkHoverState();
    }

    removeHoverButton(event) {
        if (event.detail.instance !== this) return false;
        const id = event.detail.id;
        const elementIndex = this.elementHoverExists(id);
        if (elementIndex === -1) return false;
        this.hoverState.splice(elementIndex, 1);
        this.checkHoverState();
    }

    buttonClick(event) {
        if (event.detail.instance !== this) return false;
        newCustomEvent(event.detail.event);
    }

    start() {
        this.registerEvents();
        this.active = true;
        this.render();
        newCustomEvent("afterstart");
    }
    stop() {
        clearContext();
        document.body.style.cursor = "";
        this.removeEvents();
        this.active = false;
        newCustomEvent("afterstop");
    }

    reset() {
        clearContext();
        this.removeEvents();
        this.active = false;
    }
}
