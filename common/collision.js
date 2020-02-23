import { REMOVE_TARGET, REMOVE_FIREBALL, CREATE_PARTICLES } from "./../common/events";

export const collisionLoop = (fireballs, targets) => {
    if (fireballs.length === 0) return;
    for (let target of targets) {
        for (let fireball of fireballs) {
            checkCollision(target, fireball);
        }
    }
}
const checkCollision = (target, fireball) => {

    const dx = target.x - fireball.x;
    const dy = target.y - fireball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < target.radius + fireball.radius) {
        REMOVE_TARGET(target.id);
        REMOVE_FIREBALL(fireball.id);
        CREATE_PARTICLES(target.x, target.y, target.fillColor);
    }
}