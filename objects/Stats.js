import { context } from "./../common/canvas";
import { vw, vh, FONT } from "./../common/constants";
import { writeToStorage } from "../common/storage";

export class Stats {
    constructor() {
        this.bullets = 0;
        this.hits = 0;
        this.score = 0;
        this.penalty = 5;
        this.registerEvents();
        this.bulletsElement = document.getElementById("bullets");
        this.hitsElement = document.getElementById("hits");
        this.playerName;
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

    reset() {
        this.bullets = 0;
        this.hits = 0;
        this.score = 0;
    }

    calculateScore() {
        const minusPoints = this.bullets - this.hits;
        const penalty = this.penalty * minusPoints;
        const points = this.hits * 10;
        this.score = points - penalty;
    }

    setPlayerName(name) {
        this.playerName = name;
    }

    renderNewInfo(args) {
        let radius = 50;
        let font1Size = 16;
        let font2Size = 30;
        if (args.final) {
            font1Size = 32;
            font2Size = 60;
            radius = 100;
        }

        const positionRight = vw - radius - args.right;
        const positionBottom = vh - radius - args.bottom;


        context.beginPath();
        context.arc(positionRight, positionBottom, radius, 0, 2 * Math.PI, false);
        context.fillStyle = "#38393b";
        context.fill();

        context.font = font1Size + "px " + FONT;
        context.fillStyle = args.color;
        const textWidth = context.measureText(args.label).width;
        context.fillText(args.label, positionRight - textWidth / 2, positionBottom - radius / 2);

        context.font = "bold " + font2Size + "px " + FONT;
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

        this.renderInfo();
    }

    renderInfo() {
        context.font = "14px " + FONT;
        context.fillStyle = "white";
        const text = "Use your mouse to move cannon and left mouse click to shoot."
        context.fillText(text, 25, vh - 30);
    }

    renderFinalScore() {
        this.renderNewInfo({
            right: vw / 2 - 100,
            bottom: vh / 2,
            label: "Score",
            parameter: "score",
            color: "white",
            final: true
        });
    }

    render(showFinalScreen = false) {
        if (showFinalScreen) {
            this.renderFinalScore();
            writeToStorage(this.playerName, this.score);
        }
        else {
            this.renderGraphics();
        }
    }
}