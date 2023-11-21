import YapheEngine from "../../src/modules/Engine.js";


const yapheEngine = new YapheEngine({element: ".yaphe-simulation"});
const ropeWorld = yapheEngine.createWorld2D();
ropeWorld.gravity = false;

const rope = ropeWorld.createRope();
rope.length = 20;
rope.particleRadius = 2;
rope.spacing = 10;
rope.constrainLength = 20;
rope.stiffness = 0.1;
rope.linkParticles();

yapheEngine.ingnite();