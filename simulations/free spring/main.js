import YapheEngine from "../../src/modules/Engine.js"

const yapheEngine = new YapheEngine({element: ".yaphe-simulation"});
const springWorld = yapheEngine.createWorld2D();
springWorld.gravity = false;
const a = springWorld.createParticle2D(springWorld.center.x, springWorld.center.y - 100);
const b = springWorld.createParticle2D(springWorld.center.x, springWorld.center.y + 100);
const spring = springWorld.createSpring(a, b);

yapheEngine.ingnite();