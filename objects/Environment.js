import { context, canvas } from "./../common/canvas";
import { vw, vh } from "./../common/constants";
import patternImage from "./../assets/pat.png";

export class Environment {
    constructor() {
        // Gradient
        this.colorStart = "#03184b";
        this.colorEnd = "#00c8ff";
        this.gradient = context.createRadialGradient(vw / 2, vh / 2, vh, vw / 2, vh / 2, 0);
        this.gradient.addColorStop(0, this.colorStart);
        this.gradient.addColorStop(1, this.colorEnd);
    }

    setBaseColor(start, end) {
        this.colorStart = start;
        this.colorEnd = end;
        this.gradient.addColorStop(0, this.colorStart);
        this.gradient.addColorStop(1, this.colorEnd);
    }

    render() {
        context.fillStyle = this.gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}