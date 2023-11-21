import YapheEngine from "../../src/modules/Engine.js";

const yapheEngine = new YapheEngine({element: ".yaphe-simulation"});
const ropeWorld = yapheEngine.createWorld2D();

const rope = ropeWorld.createRope(ropeWorld.center.x, ropeWorld.center.y - 100, 30);
rope.spacing = 0.1;
rope.particleRadius = 2;
rope.stiffness = 0.9;
rope.linkParticles();
rope.particles[0].locked = true;

yapheEngine.ingnite();