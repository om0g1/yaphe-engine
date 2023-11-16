import Vector2D from "./Vector2D.js";

const twoPI = 2 * Math.PI;

class Particle2D {
    constructor(pen = null, x = 0, y = 0, deltaTime = 1 / 60) {
        this.mass = 1;
        this.pen = pen;
        this.radius = 16;
        this.position = new Vector2D(x, y);
        this.velocity = new Vector2D();
        this.acceleration = new Vector2D();
        this.deltaTime = deltaTime;
    }
    isOnCeiling(boundary) {
        return this.position.y <= boundary.start.y + this.radius;
    }
    isOnWall(boundary) {
        return (
            this.position.x <= boundary.start.x + this.radius ||
            this.position.x >= boundary.end.x - this.radius
        )
    }
    isOnFloor(boundary) {
        return this.position.y >= boundary.end.y - this.radius;
    }
    constrain(boundary) {
        if (this.position.x      < boundary.start.x + this.radius) {this.position.x = boundary.start.x + this.radius}
        else if (this.position.x > boundary.end.x - this.radius) {this.position.x = boundary.end.x - this.radius}
        if (this.position.y      < boundary.start.y + this.radius) {this.position.y = boundary.start.y + this.radius}
        else if (this.position.y > boundary.end.y - this.radius) {this.position.y = boundary.end.y - this.radius} 
    }
    isOutOfBoundary(boundary) {
        return (
            this.position.x <= boundary.start.x + this.radius ||
            this.position.y <= boundary.start.y + this.radius ||
            this.position.x >= boundary.end.x - this.radius ||
            this.position.y >= boundary.end.y - this.radius
        )
    }
    applyForce(forceVector) {
        const force = forceVector.copy();
        force.scalarDivide(this.mass);
        this.acceleration.add(force);
    }
    update() {
        this.velocity.add(this.acceleration.scalarMultiply(this.deltaTime));
        this.position.add(this.velocity);
        this.acceleration.scalarMultiply(0);
    }
    show() {
        this.pen.beginPath();
        this.pen.arc(this.position.x, this.position.y, this.radius, 0, twoPI);
        this.pen.fill();
    }
}

export default Particle2D;