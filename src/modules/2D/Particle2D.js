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
        this.mouseLocked = false;
        this.locked = false;
        this.drawStyle = {
            fill: true,
            stroke: false,
            fillColor: "black",
            strokeColor: "blue",
            strokeWidth: 3
        }
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
            this.position.x < boundary.start.x + this.radius ||
            this.position.y < boundary.start.y + this.radius ||
            this.position.x > boundary.end.x - this.radius ||
            this.position.y > boundary.end.y - this.radius
        )
    }
    applyForce(forceVector) {
        const force = forceVector.copy();
        force.scalarDivide(this.mass);
        this.acceleration.add(force);
    }
    update() {
        if (this.locked || this.mouseLocked) return;

        this.velocity.add(this.acceleration.scalarMultiply(this.deltaTime));
        this.position.add(this.velocity);
        this.acceleration.scalarMultiply(0);
    }
    show() {
        let tempFillColor = null;
        let tempStrokeColor = null;
        let tempStokeWidth = null;

        if (this.pen.fillStyle != this.drawStyle.fillColor) {
            tempFillColor = this.pen.fillColor;
            this.pen.fillStyle = this.drawStyle.fillColor;
        }
        if (this.pen.strokeStyle != this.drawStyle.strokeColor) {
            tempStrokeColor = this.pen.strokeStyle;
            this.pen.strokeStyle = this.drawStyle.strokeColor;
        }
        if (this.pen.lineWidth != this.drawStyle.strokeWidth) {
            tempStokeWidth = this.pen.lineWidth;
            this.pen.lineWidth = this.drawStyle.strokeWidth;
        }

        this.pen.beginPath();
        this.pen.arc(this.position.x, this.position.y, this.radius, 0, twoPI);

        if (this.drawStyle.fill) { this.pen.fill() };
        if (this.drawStyle.stroke) { this.pen.stroke() };

        if (tempFillColor != null) { this.pen.fillColor = tempFillColor };
        if (tempStrokeColor != null) { this.pen.strokeColor = tempStrokeColor };
        if (tempStokeWidth != null) { this.pen.lineWidth = tempStokeWidth };

        this.pen.closePath();
    }
}

export default Particle2D;