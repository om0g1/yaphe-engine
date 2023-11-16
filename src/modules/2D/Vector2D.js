class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    add(Vector) {
        this.x += Vector.x;
        this.y += Vector.y;
        return this;
    }
    subtract(Vector) {
        this.x -= Vector.x;
        this.y -= Vector.y;
        return this;
    }
    scalarMultiply(Scalar) {
        this.x *= Scalar;
        this.y *= Scalar;
        return this;
    }
    vectorMutliply(Vector) {
        this.x *= Vector.x;
        this.y *= Vector.y;
        return this;
    }
    scalarDivide(Scalar) {
        this.x /= Scalar;
        this.y /= Scalar;
        return this;
    }
    vectorDivide(Vector) {
        this.x /= Vector.x;
        this.y /= Vector.y;
        return this;
    }
    distance(Vector) {
        return Math.sqrt((this.x - Vector.x) ** 2 + (this.y - Vector.y) ** 2);
    }
    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    dot(Vector) {
        return this.x * Vector.x + this.y * Vector.y;
    }
    normalize() {
        this.x /= this.magnitude();
        this.y /= this.magnitude();
        return this;
    }
    copy() {
        return new Vector2D(this.x, this.y);
    }
}

export default Vector2D;