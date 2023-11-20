import YapheEngine from "../../src/modules/Engine.js";


const yapheEngine = new YapheEngine({element: ".yaphe-simulation"});
const ropeWorld = yapheEngine.createWorld2D();

const rope = ropeWorld.createSoftBody();
rope.spacing = 0.1;
rope.particleRadius = 2;
rope.stiffness = 0.5;
rope.particleMass = 1.5;
rope.createRectangle(1, 25);
rope.particles[0].locked = true;

yapheEngine.ingnite();