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
        this.center = new Vector2D();
        this.isHallow = true;
        this.frame = [];
        this.position = parentWorld.center.copy().subtract(new Vector2D(200, 200));
        this.noOfParticles = 0;
    }
    createGeometry(points) {
        this.particles = [];
        points.forEach((point) => {
            const particle = this.parentWorld.createParticle2D(
                point.x,
                point.y
            )
            particle.radius = this.particleRadius;
            particle.mass = this.particleMass;

            this.particles.push(particle);

            this.frame.push(particle.positionCopy());
        })
        
        if (this.isHallow) {
            for (let i = 0; i < this.particles.length; i++) {
                let spring
                if (i < this.particles.length -1) {
                    spring = this.parentWorld.createSpring(this.particles[i], this.particles[i + 1]);
                } else {
                    spring = this.parentWorld.createSpring(this.particles[i], this.particles[0]);
                }
                spring.stiffness = this.stiffness;
                
                this.springs.push(spring);
            }
        } else {
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = 0; j < this.particles.length; j++) {
                    if (i !== j) {
                        const spring = this.parentWorld.createSpring(this.particles[i], this.particles[j]);

                        if (spring == false) continue;

                        spring.stiffness = this.stiffness;

                        this.springs.push(spring);
                    }
                }
            }
        }

    }
    createRectangle(width = this.width, height = this.height) {
        this.width = width;
        this.height = height;
        if (this.isHallow){
            // for (let y = 0; y < this.height; y++) {
            //     for (let x = 0; x < this.width; x++) {
            //         const particle = this.parentWorld.createParticle2D(
            //             x * this.spacing,
            //             y * this.spacing
            //         )
            //         this.particles.push(particle);
            //     }
            // }
            // for (let y = this.height - 1; y > 0; y--) {
            //     for (let x = this.width - 1; x > -1; x--) {
            //         const particle = this.parentWorld.createParticle2D(
            //             x * this.spacing,
            //             y * this.spacing
            //         )
            //         this.particles.push(particle);
            //     }
            // }
            // for (let i = 0; i < this.particles.length; i++) {
            //     for (let j = 0; j < this.particles.length; j++) {
            //         if (i !== j) {
            //             const spring = this.parentWorld.createSpring(this.particles[i], this.particles[j]);

            //             if (spring == false) continue;

            //             spring.stiffness = this.stiffness;

            //             this.springs.push(spring);
            //         }
            //     }
            // }
        } else {for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    const particle = this.parentWorld.createParticle2D(
                        this.position.x + this.spacing * x,
                        this.position.y + this.spacing * y
                        )
                    particle.radius = this.particleRadius;
                    particle.mass = this.particleMass;
                    this.noOfParticles++;
                    this.particles.push(particle);
                }
            }
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = 0; j < this.particles.length; j++) {
                    if (i !== j) {
                        const spring = this.parentWorld.createSpring(this.particles[i], this.particles[j]);

                        if (spring == false) continue;

                        spring.stiffness = this.stiffness;

                        this.springs.push(spring);
                    }
                }
            }
        }
    }
    getBorder() {
        const borderParticlesSet = new Set();
        
        // Collect all border particles
        for (let y = 0; y < this.particles.length; y++) {
            for (let x = 0; x < this.particles[y].length; x++) {
                if (x === 0 || y === 0 || x === this.particles[y].length - 1 || y === this.particles.length - 1) {
                    borderParticlesSet.add(this.particles[y][x]);
                    this.borderParticles.push(this.particles[y][x]);
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
        // this.particles.forEach((row) => {
        //     row.forEach((particle) => {
        //         const originalX = (particle.internalPressureDirection.x * this.spacing * 2.5) + this.center.x;
        //         const originalY = (particle.internalPressureDirection.y * this.spacing * 2.5) + this.center.y;
    
        //         const originalVector = new Vector2D(originalX, originalY);
        //         const angle = originalVector.angleAround(this.center, particle.position).toFixed(2);
    
        //         const directionVector = originalVector.rotateAround(this.center, angle);
        //         const force = directionVector.subtract(particle.position);
        //         const displacement = force.magnitude();
        //         force.normalize();
    
        //         particle.applyForce(force.scalarMultiply(0.1 * displacement));
        //     })
        // })
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
    update() {
        // this.center.x = (this.width * this.spacing / 2) + this.particles[0][0].position.x;
        // this.center.y = (this.height * this.spacing / 2) + this.particles[0][0].position.y;
        let totalPosition = new Vector2D();
        this.particles.forEach((particle) => {
            totalPosition.add(particle.position);
        })
        this.center = totalPosition.scalarDivide(this.noOfParticles);
        if (this.width > 1 && this.height > 1) {
            this.applyInternalPressure();
        }
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