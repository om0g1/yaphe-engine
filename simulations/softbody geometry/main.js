import YapheEngine from "../../src/modules/Engine.js";
import Vector2D from "../../src/modules/2D/Vector2D.js";


const yapheEngine = new YapheEngine({element: ".yaphe-simulation"});
const softbodyWorld = yapheEngine.createWorld2D();

const softbody = softbodyWorld.createSoftBody();
softbody.spacing = 70;
softbody.stiffness = 0.15;
softbody.particleRadius = 16;

const points = [
    new Vector2D(softbodyWorld.center.x - 200, softbodyWorld.center.y - 200),
    new Vector2D(softbodyWorld.center.x, softbodyWorld.center.y - 250),
    new Vector2D(softbodyWorld.center.x + 200, softbodyWorld.center.y - 200),
    new Vector2D(softbodyWorld.center.x + 200, softbodyWorld.center.y + 200),
    new Vector2D(softbodyWorld.center.x - 200, softbodyWorld.center.y + 200),
]

softbody.createGeometry(points);
softbody.borderSprings.forEach((spring) => {
    spring.drawStyle.color = "red";
})

yapheEngine.ingnite();