import { context, canvas } from "./../common/canvas";
import { vw, vh } from "./../common/constants";
import patternImage from "./../assets/pat.png";

export class Environment {
    constructor() {
        this.render();
    }
    background() {
        const gradient = context.createRadialGradient(vw / 2, vh / 2, vh, vw / 2, vh / 2, 0);
        const patternImageObject = new Image();
        patternImageObject.src = patternImage;
        const pattern = context.createPattern(patternImageObject, 'repeat');
        gradient.addColorStop(0, "#03184b");
        gradient.addColorStop(1, "#00c8ff");
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = pattern;
        context.fillRect(0, 0, canvas.width, canvas.height);

    }

    render() {
        this.background();

    }
}