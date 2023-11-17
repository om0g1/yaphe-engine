import Vector2D from "./Vector2D.js";


class SoftBody2D {
    constructor (parentWorld = null, width = 2, height = 2) {
        this.springs = [];
        this.spacing = 100;
        this.particles = [];
        this.width = width;
        this.height = height;
        this.particleRadius = 16;
        this.borderSprings = [];
        this.borderParticles = [];
        this.stiffness = 0.01;
        this.idealGasConstant = 10;
        this.particleMass = 5;
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
                particle.mass = this.particleMass;
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
        this.getBorder();
    }
    getBorder() {
        const borderParticlesSet = new Set();
        
        // Collect all border particles
        for (let y = 0; y < this.particles.length; y++) {
            for (let x = 0; x < this.particles[y].length; x++) {
                if (x === 0 || y === 0 || x === this.particles[y].length - 1 || y === this.particles.length - 1) {
                    borderParticlesSet.add(this.particles[y][x]);
                }
            }
        }
    
        // Collect springs connected to border particles
        for (const spring of this.springs) {
            if (borderParticlesSet.has(spring.anchors.a) && borderParticlesSet.has(spring.anchors.b)) {
                this.borderSprings.push(spring);
            }
        }
    }
    
    getPressure() {
        const width = this.particles[0][0].position.distance(this.particles[0][this.particles[0].length - 1].position);
        const height = this.particles[0][0].position.distance(this.particles[this.particles.length - 1][0].position)
        const area = width / 100 * height / 100;

        let numParticles = this.width * this.height;
        const moles = numParticles / this.particleMass;
        
        const pressure = (moles * this.idealGasConstant) / area;
        return pressure;
    }
    applyInternalPressure() {
        const pressure = this.getPressure();
        console.log(pressure);
        this.borderSprings.forEach((spring, i) => {
            const direction = spring.getNormalDirection();
            const force = direction.scalarMultiply(pressure * spring.getLength());
            spring.anchors.a.applyForce(force);
            spring.anchors.b.applyForce(force);
        })
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