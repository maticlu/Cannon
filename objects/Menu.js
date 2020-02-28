import { Environment } from "./Environment";
import { clearContext, context } from "./../common/canvas";
import { vw, vh } from "./../common/constants";
import { Button } from "./Button";
import { MainMenu } from "./MainMenu";

export class Menu extends MainMenu {

    constructor(buttonConfiguration) {
        super();
        this.x = 0;
        this.y = 300;
        this.logo = "";
        this.width = vw;
        this.height = vh;
        this.config = buttonConfiguration;
        this.buttons = [];
        this.addButtons();
        this.registerEvents();
        this.environment = new Environment();
        this.environment.setBaseColor("#000", "#000");
        this.active = true;

    }
    setLogo(logo) {
        this.logo = logo;
    }
    renderLogo() {
        const left = vw / 2 - 200 / 2;
        context.drawImage(this.logo, left, 100, 200, 53.5);

    }
    render() {
        if (!this.active) return;
        clearContext();

        this.environment.render();
        this.buttons.forEach((button) => button.render());
        this.renderLogo();
        window.requestAnimationFrame(this.render.bind(this));
    }
}