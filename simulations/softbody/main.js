import YapheEngine from "../../src/modules/Engine.js";


const yapheEngine = new YapheEngine({element: ".yaphe-simulation"});
const softbodyWorld = yapheEngine.createWorld2D();

const softbody = softbodyWorld.createSoftBody();
softbody.spacing = 100;
softbody.stiffness = 0.05;
softbody.createGeometry(5, 5);

yapheEngine.ingnite();