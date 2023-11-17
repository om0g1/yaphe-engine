import YapheEngine from "../../src/modules/Engine.js";


const yapheEngine = new YapheEngine({element: ".yaphe-simulation"});
const softbodyWorld = yapheEngine.createWorld2D();

const softbody = softbodyWorld.createSoftBody();
softbody.spacing = 100;
softbody.stiffness = 0.15;
softbody.createGeometry(5, 5);
softbody.borderSprings.forEach((spring) => {
    spring.drawStyle.color = "red";
})

yapheEngine.ingnite();