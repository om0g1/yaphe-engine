import YapheEngine from "../../src/modules/Engine.js";


const yapheEngine = new YapheEngine({element: ".yaphe-simulation"});
const ropeWorld = yapheEngine.createWorld2D();
ropeWorld.gravity = false;

const rope = ropeWorld.createSoftBody();
rope.particleRadius = 5;
rope.spacing = 10;
rope.stiffness = 0.8;
rope.createRectangle(1, 20);

yapheEngine.ingnite();