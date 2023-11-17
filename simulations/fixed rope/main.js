import YapheEngine from "../../src/modules/Engine.js";


const yapheEngine = new YapheEngine({element: ".yaphe-simulation"});
const ropeWorld = yapheEngine.createWorld2D();

const rope = ropeWorld.createSoftBody();
rope.spacing = 10;
rope.particleRadius = 2;
rope.stiffness = 0.15;
rope.particleMass = 1.5;
rope.createGeometry(1, 20);
rope.particles[0][0].locked = true;

yapheEngine.ingnite();