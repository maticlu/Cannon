import { vw, vh } from "./constants";

export const canvas = document.getElementById("app");
canvas.setAttribute("width", vw);
canvas.setAttribute("height", vh);

export const context = canvas.getContext("2d");

export const clearContext = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
};
