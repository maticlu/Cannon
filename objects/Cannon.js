import { vw, vh } from "../common/constants";
import { context, clearContext } from "../common/canvas";
import { toRad } from "../common/convert";
import cannonImage from "./../assets/Cannon.png";
import { EVENT_FIRE } from "../common/events";


const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_SPACE = 32;

export class Cannon {
    constructor() {
        this.image = new Image();
        this.image.src = cannonImage;
        this.rotation = 0;
        this.speed = 2;
        this.time = 0;
        this.x = (vw / 2 - 50);
        this.y = (vh);
        this.registerEvents();
        this.image.onload = () => {
            this.render();
        };
        this.maxRotationLeft = -1.7;
        this.maxRotationRight = 1.7;

    }


    render() {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        context.drawImage(this.image, -50, -100, 100, 200);
        context.restore();
    }

    registerEvents() {
        document.addEventListener("keydown", (e) => {
            const date = new Date();


            if (this.time === 0) {
                this.time = date;
            }
            else {
                if ((date - this.time) > 250) {
                    this.speed = 3;
                }
                if ((date - this.time) > 500) {
                    this.speed = 4;
                }
            }



            if (e.keyCode === KEY_LEFT) {
                this.rotate(-this.speed);
            }
            if (e.keyCode === KEY_RIGHT) {
                this.rotate(this.speed);
            }
            if (e.keyCode == KEY_SPACE) {
                this.fire();
            }
        });

        document.addEventListener("keyup", (e) => {
            this.speed = 1;
            this.time = 0;
        });
    }

    rotate(degrees) {
        // Limit rotation

        if (degrees > 0 && this.rotation > this.maxRotationRight) {
            return false;
        }
        if (degrees < 0 && this.rotation < this.maxRotationLeft) {
            return false;
        }

        //  Do the rotation
        const rad = toRad(degrees);
        this.rotation += rad;
    }
    fire() {
        EVENT_FIRE(this.rotation);
    }
}
