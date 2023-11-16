import YapheEngine from "../../src/modules/Engine.js";


const yapheEngine = new YapheEngine({element: ".yaphe-simulation"});
const ropeWorld = yapheEngine.createWorld2D();
ropeWorld.gravity = false;

const rope = ropeWorld.createSoftBody();
rope.spacing = 100;
rope.stiffness = 0.02;
rope.createGeometry(1, 7);

yapheEngine.ingnite();