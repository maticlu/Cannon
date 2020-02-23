import { context } from "./../common/canvas";
import { vw, vh } from "./../common/constants";

export class Stats {
    constructor() {
        this.bullets = 0;
        this.hits = 0;
        this.score = 0;
        this.penalty = 5;
        this.registerEvents();
        this.bulletsElement = document.getElementById("bullets");
        this.hitsElement = document.getElementById("hits");
    }

    registerEvents() {
        document.addEventListener("removefireball", () => {
            this.bullets++;
            this.calculateScore();
        });
        document.addEventListener("removetarget", () => {
            this.hits++;
            this.calculateScore();
        });
    }

    calculateScore() {
        const minusPoints = this.bullets - this.hits;
        const penalty = this.penalty * minusPoints;
        const points = this.hits * 10;
        this.score = points - penalty;
    }

    renderNewInfo(args) {
        const radius = 50;
        const positionRight = vw - radius - args.right;
        const positionBottom = vh - radius - args.bottom;




        context.beginPath();
        context.arc(positionRight, positionBottom, radius, 0, 2 * Math.PI, false);
        context.fillStyle = "#38393b";
        context.fill();


        context.font = "16px Jura";
        context.fillStyle = args.color;
        const textWidth = context.measureText(args.label).width;
        context.fillText(args.label, positionRight - textWidth / 2, positionBottom - radius / 2);

        context.font = "bold 30px Jura";
        context.fillStyle = args.color;
        const parameter = this[args.parameter];
        const parameterWidth = context.measureText(parameter).width;
        context.fillText(parameter, positionRight - parameterWidth / 2, positionBottom + 15);
    }

    renderGraphics() {
        this.renderNewInfo({
            right: 10,
            bottom: 10,
            label: "Bullets",
            parameter: "bullets",
            color: "white"
        });

        this.renderNewInfo({
            right: 120,
            bottom: 10,
            label: "Hits",
            parameter: "hits",
            color: "white"
        });

        this.renderNewInfo({
            right: 230,
            bottom: 10,
            label: "Score",
            parameter: "score",
            color: "white"
        });

        // context.beginPath();
        // context.arc(vw - 180, vh - 60, 50, 0, 2 * Math.PI, false);
        // context.fillStyle = "white";
        // context.fill();

        // const hitsText = "HITS";
        // context.font = "16px Jura";
        // context.fillStyle = "black";

        // const hitsTextWidth = context.measureText(hitsText).width;

        // context.fillText(hitsText, vw - 59 - hitsTextWidth / 2, vh - 80);

        // const bulletsText = "BULLETS";
        // context.font = "16px Jura";
        // context.fillStyle = "black";

        // const bulletsTextWidth = context.measureText(bulletsText).width;

        // context.fillText(bulletsText, vw - 179 - bulletsTextWidth / 2, vh - 80);





    }


    render() {
        this.renderGraphics();
    }
}