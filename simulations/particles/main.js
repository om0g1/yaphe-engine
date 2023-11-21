import YapheEngine from "../../src/modules/Engine.js";

const yapheEngine = new YapheEngine({
    element: ".yaphe-simulation"
});
const particleWorld = yapheEngine.createWorld2D();

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1));
}

for (let i = 0; i < 500; i++) {
    const particle = particleWorld.createParticle2D();
    particle.radius = 2;
    particle.position.x = getRandomInteger(0, particleWorld.canvas.width);
    particle.position.y = getRandomInteger(0, particleWorld.canvas.height);
}

yapheEngine.ingnite();