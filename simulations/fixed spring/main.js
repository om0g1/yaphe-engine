import YapheEngine from "../../src/modules/Engine.js"

const yapheEngine = new YapheEngine({element: ".yaphe-simulation"});
const springWorld = yapheEngine.createWorld2D();
const a = springWorld.createParticle2D(springWorld.center.x, springWorld.center.y - 100);
a.locked = true;
const b = springWorld.createParticle2D(springWorld.center.x, springWorld.center.y + 100);
const spring = springWorld.createSpring(a, b);
spring.constrainLength = spring.restLength;

yapheEngine.ingnite();