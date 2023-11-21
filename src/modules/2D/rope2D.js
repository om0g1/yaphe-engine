import Vector2D from "./Vector2D.js";

class Rope2D {
    constructor(x = 0, y = 0, length = 10) {
        this.parentWorld = null;
        this.length = length;
        this.particles = [];
        this.springs = [];
        this.springMaxLength = 0;
        this.spacing = 1;
        this.position = new Vector2D(x, y);
        this.stiffness = 0.1;
        this.particleRadius = 5;
        this.constrainLength = this.spacing;
    }
    linkParticles() {
        for(let i = 0; i < this.length; i++) {
            const particle = this.parentWorld.createParticle2D();
            
            particle.position.x = this.position.x;
            particle.position.y = this.position.y + (this.spacing * i);
            particle.radius = this.particleRadius;

            this.particles.push(particle);
        }
        for (let i = 0; i < this.particles.length - 1; i++) {
            const a = this.particles[i];
            const b = this.particles[i + 1];

            const spring = this.parentWorld.createSpring(a, b, this.stiffness);
            spring.stiffness = this.stiffness;
            spring.constrainLength = this.constrainLength;

            this.springs.push(spring);
        }
    }
    show() {
        this.springs.forEach((spring) => {
            spring.show();
        })
        this.particles.forEach((particle) => {
            particle.show();
        })
    }
}

export default Rope2D;