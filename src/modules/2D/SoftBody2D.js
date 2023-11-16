import Vector2D from "./Vector2D.js";


class SoftBody2D {
    constructor (parentWorld = null, width = 2, height = 2) {
        this.spacing = 100;
        this.springs = [];
        this.particles = [];
        this.particleRadius = 16;
        this.width = width;
        this.height = height;
        this.stiffness = 0.01;
        this.particleRadius = 20;
        this.parentWorld = parentWorld;
        this.position = parentWorld.center.copy().subtract(new Vector2D(200, 200));
    }
    createGeometry(width = this.width, height = this.height) {
        this.width = width;
        this.height = height;
        for (let y = 0; y < this.height; y++) {
            this.particles.push([]);
            for (let x = 0; x < this.width; x++) {
                const particle = this.parentWorld.createParticle2D(
                    this.position.x + this.spacing * x,
                    this.position.y + this.spacing * y
                    )
                particle.radius = this.particleRadius;
                this.particles[y].push(particle);
            }
        }
        for (let y = 0; y < this.particles.length; y++) {
            for (let x = 0; x < this.particles[y].length; x++) {
                const particle = this.particles[y][x];
                const neighbours = this.getNeighbours(x, y);
                neighbours.forEach((neighbour) => {
                    const spring = this.parentWorld.createSpring(particle, neighbour);

                    if (spring != false) {
                        spring.stiffness = this.stiffness;
                        this.springs.push(spring);
                    }
                })
                
            }
        }
    }
    getNeighbours(x, y) {
        let neighbours = [];
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {

                if (i == 0 && j == 0) continue;
                const xIndex = x + j;
                const yIndex = y + i;

                if (!this.isValidParticleIndex(xIndex, yIndex, this.particles[y].length)) continue;
                
                const particle = this.particles[yIndex][xIndex];
                neighbours.push(particle);
            }
        }
        return neighbours;
    }
    isValidParticleIndex(x, y, rowlength) {
        return (
            x > -1 &&
            x < rowlength &&
            y > -1 &&
            y < this.particles.length 
        )
    }
    show() {
        this.springs.forEach((spring) => {
            spring.show();
        })
        this.particles.forEach((row) => {
            row.forEach((particle) => {
                particle.show();
            })
        })
    }
}

export default SoftBody2D;