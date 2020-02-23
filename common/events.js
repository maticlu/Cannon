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

const newCustomEvent = (eventName, data = null) => {
    const event = new CustomEvent(eventName, { detail: data });
    document.dispatchEvent(event);
}