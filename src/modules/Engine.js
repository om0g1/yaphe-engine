import PhysicsWorld2D from "./2D/PhysicsWorld2D.js";
import Vector2D from "./2D/Vector2D.js";

class YapheEngine {
    constructor(constructors = {element: null}) {
        this.element = constructors.element;
        this.world2Ds = [];
        this.mainloop = null;
        this.framesPerSecond = 60;
        this.deltaTime = 1 / this.framesPerSecond;
    }
    createWorld2D(width = null, height = null) {
        
        //create a physics world 2D class
        //create the canvas of the world
        const world2D = new PhysicsWorld2D(this.element);
        world2D.createCanvas(width, height);
        world2D.deltaTime = this.deltaTime;
        this.world2Ds.push(world2D);
        
        return world2D;
    }
    createVector2D(x = 0, y = 0) {
        const vector = new Vector2D(x, y);
        return vector;
    }
    start() {
        
        //Start the main event loop according to the frameRate
        this.mainloop = setInterval(() => {
            this.world2Ds.forEach((world) => {
                world.update();
                world.show();
            })
        }, this.deltaTime);
    }
    ingnite() {
        this.start();
    }
}

export default YapheEngine;