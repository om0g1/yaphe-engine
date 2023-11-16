import Particle2D from "./Particle2D.js";
import Vector2D from "./Vector2D.js";

class PhysicsWorld2D {
    constructor(parent) {
        this.springs = [];
        this.gravity = [];   
        this.canvas = null;
        this.pen = null;
        this.particles = [];
        this.softBodies = [];
        this.gravity = true;
        this.Gravity = new Vector2D(0, 1);
        this.parentElement = document.querySelector(parent);
        this.mousePos = new Vector2D();
        this.center = new Vector2D();
        this.boundary = {
            start: new Vector2D(),
            end: new Vector2D()
        }
        this.gravity = new Vector2D();
    }
    createCanvas(width = null, height = null) {
        this.canvas = document.createElement("canvas");
        
        //Check if the width and height are given
        if (width == null && height == null) { //If none are given the canvas will fit the whole screen
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        } else if (height == null) { //if one is given create a square canvas
            this.canvas.width = width;
            this.canvas.height = width;
        } else { //If both are given use the values
            this.canvas.width = width;
            this.canvas.height = height;
        }

        this.pen = this.canvas.getContext("2d");

        //Set the center of the canvas after the height and width are given
        this.center.x = this.canvas.width / 2;
        this.center.y = this.canvas.height / 2;

        //Set the boundary start and end position
        this.boundary.start.x = 0;
        this.boundary.start.y = 0;
        this.boundary.end.x = this.canvas.width;
        this.boundary.end.y = this.canvas.height;

        //Add the canvas to the page
        this.parentElement.appendChild(this.canvas);
        this.initializeInputHandler();
    }
    initializeInputHandler() {
        this.canvas.onmousedown = (e) => {
            if (e.button == 0) {
                this.handleGrabParticle(e.clientX, e.clientY);
                this.moveParticle(e.clientX, e.clientY);
            }
        }
        this.canvas.onmousemove = (e) => {
            if (this.isMovingParticle) {
                this.setMousePosition(e.clientX, e.clientY);
                this.moveParticle(e.clientX, e.clientY);
            }
        }
        this.canvas.onmouseup = () => {
            if (this.particleClosestToMouse != null) {
                this.particleClosestToMouse.mouseLocked = false;
                this.canvas.style.cursor = "auto";
                this.particleClosestToMouse = null;
            }
        }
        this.canvas.onmouseleave = () => {
            if (this.particleClosestToMouse != null) {
                this.particleClosestToMouse.mouseLocked = false;
                this.canvas.style.cursor = "auto";
                this.particleClosestToMouse = null;
            }
        }
        this.canvas.ontouchstart = (e) => {
            this.handleGrabParticle(e.touches[0].clientX, e.touches[0].clientY);
            this.moveParticle(e.touches[0].clientX, e.touches[0].clientY);
        }
        this.canvas.ontouchmove = (e) => {
            if (this.isMovingParticle) {
                this.moveParticle(e.touches[0].clientX, e.touches[0].clientY);
            }
        }
        this.canvas.ontouchend = () => {
            if (this.particleClosestToMouse != null) {
                this.particleClosestToMouse.mouseLocked = false;
                this.particleClosestToMouse = null;
                this.isMovingParticle = false;
            }
        }
    }
    getParticleCloseToMouse() {
        const maxDistance = 50;
        let smallestDistance = Infinity;
        let closestParticle = null;
        this.particles.forEach((particle) => {
            const distanceToParticle = particle.position.distance(this.mousePos);
            if (distanceToParticle < maxDistance && distanceToParticle < smallestDistance) {
                smallestDistance = distanceToParticle;
                closestParticle = particle;
            }
        })
        return closestParticle;
    }
    setMousePosition(x, y) {
        this.mousePos.x = x;
        this.mousePos.y = y;
    }
    handleGrabParticle(x, y) {
        this.setMousePosition(x, y);
        this.particleClosestToMouse = this.getParticleCloseToMouse();
        if (this.particleClosestToMouse != null) {
            this.isMovingParticle = true;
            this.canvas.style.cursor = "grab";
            this.particleClosestToMouse.mouseLocked = true;
        }
    }    
    moveParticle(x, y) {
        if (this.isMovingParticle && this.particleClosestToMouse !== null) {
            this.particleClosestToMouse.velocity = new Vector2D();
            this.particleClosestToMouse.position.x = x;
            this.particleClosestToMouse.position.y = y;
        }
    }
    createParticle2D(x = null, y = null) {
        let particle = null;

        //Check if the x position and y position are given
        if (x === null && y === null) { //If none are given put the particle at the center
            particle = new Particle2D(this.pen, this.center.x, this.center.y);
        } else if (x !== null && y == null) { //If one is given put it on that point both on the x and y axis
            particle = new Particle2D(this.pen, x, x);
        } else { //If both are given use the values
            particle = new Particle2D(this.pen, x, y);
        }
        
        particle.deltaTime = this.deltaTime;

        //append the particle to the particles array
        this.particles.push(particle);
        
        return particle;
    }
    handleParticles() {
        this.particles.forEach((particle) => {
            particle.applyForce(this.Gravity);
            particle.update();
            particle.constrain(this.boundary);
        })
    }
    update() {
        this.handleParticles();
    }
    show() {
        this.pen.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach((particle) => {
            particle.show();
        })
    }

}

export default PhysicsWorld2D;