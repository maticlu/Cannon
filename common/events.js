export const EVENT_FIRE = (rotation) => {
    newCustomEvent("fire", rotation);
}

export const REMOVE_FIREBALL = (id) => {
    newCustomEvent("removefireball", id);
}
export const REMOVE_TARGET = (id) => {
    newCustomEvent("removetarget", id);
}

export const CREATE_PARTICLES = (x, y, color) => {
    newCustomEvent("createparticles", { x: x, y: y, color: color });
}

export const REMOVE_EXPLOSION = (id) => {
    newCustomEvent("removeexplosion", id);
}

export const BUTTON_HOVER = (id, instance) => {
    newCustomEvent("canvasbuttonhover", { id: id, instance: instance });
}

export const BUTTON_NOHOVER = (id, instance) => {
    newCustomEvent("canvasbuttonnohover", { id: id, instance: instance });
}

export const BUTTON_CLICK = (id, instance, event) => {
    newCustomEvent("canvasbuttonclick", { id: id, instance: instance, event: event });
}




export const newCustomEvent = (eventName, data = null) => {
    const event = new CustomEvent(eventName, { detail: data });
    document.dispatchEvent(event);
}