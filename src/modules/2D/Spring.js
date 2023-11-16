import Vector2D from "./Vector2D.js";

class Spring2D {
    constructor(pen = null, a = null, b = null) {
        this.pen = pen;
        this.anchors = {
            a: a,
            b: b
        }
        this.restLength = this.anchors.b.position.distance(this.anchors.a.position);
        this.force = new Vector2D();
        this.displacement = 0;
        this.stiffness = 0.1;
        this.width = 3.5;
        this.drawStyle = {
            color: "black",
            width: 1
        }
    }
    getForceAndDisplacement() {
        const aPostion = this.anchors.a.position.copy();
        const bPostion = this.anchors.b.position.copy();
        const force = bPostion.subtract(aPostion);
        const x = force.magnitude() - this.restLength;
        force.normalize();
        force.scalarMultiply(this.stiffness * x);

        this.force = force;
        this.displacement = x;
    }
    stretchSpringLine() {
        this.getForceAndDisplacement();
        const shrinkRatio = 0.005;
        this.drawStyle.width = this.width - (this.displacement * shrinkRatio);
    }
    update() {
        this.getForceAndDisplacement();
        this.anchors.a.applyForce(this.force);
        this.force.scalarMultiply(-1);
        this.anchors.b.applyForce(this.force);
    }
    show() {
        let tempLineWidth = null;
        let tempLineColor = null;

        if (this.pen.lineWidth != this.width) {
            tempLineWidth = this.pen.lineWidth;
            this.pen.lineWidth = this.drawStyle.width;
        }
        if (this.pen.strokeStyle != this.drawStyle.strokeColor) {
            tempLineColor = this.pen.strokeStyle;
            this.pen.strokeStyle = this.drawStyle.strokeColor;
        }

        this.stretchSpringLine();
        this.pen.beginPath();
        this.pen.moveTo(this.anchors.a.position.x, this.anchors.a.position.y);
        this.pen.lineTo(this.anchors.b.position.x, this.anchors.b.position.y);
        this.pen.stroke();
        this.pen.closePath();

        if (tempLineWidth != null) { this.pen.lineWidth = tempLineWidth; }
        if (tempLineColor != null) { this.pen.strokeStyle = tempLineColor; }
    }
}

export default Spring2D;