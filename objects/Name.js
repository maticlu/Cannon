import { Environment } from "./Environment";
import { MainMenu } from "./MainMenu";
import { vw, vh, FONT } from "./../common/constants";
import { context } from "../common/canvas";
import { newCustomEvent } from "../common/events";


export class Name extends MainMenu {
    constructor(buttonConfiguration) {
        super();
        this.x = 0;
        this.y = 300;
        this.logo = "";
        this.width = vw;
        this.height = vh;
        this.config = buttonConfiguration;
        this.buttons = [];
        this.environment = new Environment();
        this.environment.setBaseColor("#000", "#000");
        this.eventListener = {};
        this.addButtons();
        this.active = false;
        this.time = new Date();
        this.name = "";
        this.listenStartStop();
    }

    listenStartStop() {
        document.addEventListener("afterstart", () => {
            this.registerInputEvents();
        });
        document.addEventListener("afterstop", () => {
            this.removeInputEvents();
        });
    }

    registerInputEvents() {
        this.eventListener.input = this.inputEvent.bind(this);
        document.addEventListener("keydown", this.eventListener.input);
    }

    removeInputEvents() {
        document.removeEventListener("keydown", this.eventListener.input);
    }
    inputEvent(event) {
        if (event.keyCode === 13) {
            if (this.name.length > 0) newCustomEvent("startgame");
            return;
        }
        if (event.keyCode === 8) {
            this.name = this.name.substring(0, this.name.length - 1);
        }
        if (this.name.length >= 15) return;
        if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || (event.keyCode >= 48 && event.keyCode <= 57)) {
            this.name += event.key;
        }

        if (event.keyCode === 32) {
            this.name += " ";
        }
    }
    input() {
        context.font = "bold 30px " + FONT;
        context.fillStyle = "white";

        // Label
        const label = "Your name";
        const labelSize = context.measureText(label);
        context.fillText(label, vw / 2 - labelSize.width / 2, 200);

        // Field line
        context.beginPath();
        context.fillStyle = "white";
        context.fillRect(vw / 2 - 150, 300, 300, 3);
        context.stroke();

        // Text on the line
        context.font = "28px " + FONT;
        context.fillStyle = "white";
        const nameSize = context.measureText(this.name);
        context.fillText(this.name, vw / 2 - 140, 287);

        // Cursor
        const currentDate = new Date();
        const timeDiff = currentDate - this.time;
        const interval = 500;
        if (timeDiff < interval) return;
        if (timeDiff >= interval && timeDiff < 2 * interval) {
            context.beginPath();

            context.fillStyle = "white";
            context.fillRect((vw / 2 - 140 + nameSize.width), 265, 1, 30);
            context.stroke();
            return;
        }

        this.time = new Date();

    }

    render() {
        if (!this.active) return;
        this.environment.render();
        this.input();
        this.buttons.forEach((button) => button.render());
        window.requestAnimationFrame(this.render.bind(this));
    }
}