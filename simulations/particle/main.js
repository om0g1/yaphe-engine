import YapheEngine from "../../src/modules/Engine.js";

const yapheEngine = new YapheEngine({
    element: ".yaphe-simulation"
});
const particleWorld = yapheEngine.createWorld2D();
particleWorld.createParticle2D();

yapheEngine.ingnite();