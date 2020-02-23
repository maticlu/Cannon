import { context } from "./canvas";

export const generateColor = () => {
    return {
        r: generateRandomSpectre(),
        g: generateRandomSpectre(),
        b: generateRandomSpectre()
    }
}

export const generateGradient = (args) => {
    if (typeof args.fillColor == "undefined") {
        args.fillColor = generateColor();
    }
    const reflectionDifference = 140;
    args.reflectionColor = {
        r: args.fillColor.r + reflectionDifference,
        g: args.fillColor.g + reflectionDifference,
        b: args.fillColor.b + reflectionDifference
    }

    const gradient = context.createRadialGradient(args.x, args.y, 0.1 * args.radius, args.x, args.y, args.radius * 1.5);
    gradient.addColorStop(0, "rgb(" + args.reflectionColor.r + "," + args.reflectionColor.g + "," + args.reflectionColor.b + ")");
    gradient.addColorStop(1, "rgb(" + args.fillColor.r + "," + args.fillColor.g + "," + args.fillColor.b + ")");
    return gradient;
}


const generateRandomSpectre = (standardSpectre = 105) => {
    return Math.random() * standardSpectre;
}