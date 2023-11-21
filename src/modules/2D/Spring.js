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
        this.constrainLength = 0;
        this.parentWorld = null;
    }
    getLength() {
        this.getForceAndDisplacement();
        const length = this.restLength + this.displacement;
        return length;
    }
    getNormalDirection() {
        const lineVector = this.anchors.b.position.copy().subtract(this.anchors.a.position);
        const normalDirection = new Vector2D(lineVector.y, -lineVector.x);
        normalDirection.normalize();
        return normalDirection; 
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
    constrainParticlePosition(a, b) {
        if (this.constrainLength > 0) {
            if (b.locked) return;

            const distance = a.position.distance(b.position);
            if (distance > this.constrainLength) {
                this.force.scalarMultiply(0);
                if (!b.mouseLocked) {
                    const direction = b.position.copy().subtract(a.position);
                    direction.normalize();
                    b.position = a.position.copy().add(direction.scalarMultiply(this.constrainLength))
                } else {
                    const angle = a.position.angleAround(this.parentWorld.mousePos, b.position);
                    const newPosition = a.position.copy().add(new Vector2D(-1, 0).scalarMultiply(this.constrainLength));
                    
                    newPosition.rotateAround(this.parentWorld.mousePos, angle);
                    
                    b.position = newPosition;
                }
            }
        }
    }
    update() {
        this.getForceAndDisplacement();
        this.anchors.a.applyForce(this.force);
        this.constrainParticlePosition(this.anchors.a, this.anchors.b);
        this.force.scalarMultiply(-1);
        this.anchors.b.applyForce(this.force);
        this.constrainParticlePosition(this.anchors.b, this.anchors.a);

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
            this.pen.strokeStyle = this.drawStyle.color;
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