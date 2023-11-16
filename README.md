# Yaphe Engine - Simple Physics Engine

## Introduction

The Yaphe Engine is a simple 2D physics engine designed to simulate basic particle dynamics. This engine provides a straightforward framework for creating and manipulating particles within a canvas.

## Getting Started

To use the Yaphe Engine in your project, follow these steps:

1. **Download the Files**

   Download the following files from the repository:
   - `Engine.js`
   - `Particle2D.js`
   - `PhysicsWorld2D.js`
   - `Vector2D.js`
   - `style.css` (optional, for styling)

2. **Include the Scripts**

   Add the following lines to your HTML file to include the necessary scripts:

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <!-- Add your existing meta tags, title, and stylesheets here -->
       <link rel="stylesheet" href="path/to/style.css">
   </head>
   <body>
       <!-- Add your existing HTML content here -->

       <!-- Include Yaphe Engine scripts -->
       <script type="module" src="path/to/Engine.js"></script>
       <script type="module" src="path/to/main.js"></script>
   </body>
   </html>

3. **Create a Canvas Element**

    Inside your HTML file, create a `<div>` element with the class yaphe-simulation. This is where the canvas will be rendered:
    ``` html
    <div class="yaphe-simulation"></div>
    ```

4. **Initialize Yaphe Engine**

    In your main.js file, import the YapheEngine class and create an instance:
    
    ``` Javascript
    import YapheEngine from "./path/to/Engine.js";

    const yapheEngine = new YapheEngine({element: ".yaphe-simulation"});
    ```

5. **Create and Customize a 2D World**

    Create a 2D world and customize it as needed. For example, you can set the canvas size:

    ```Javascript
    const world = yapheEngine.create2Dworld();
    world.createCanvas(window.innerWidth, window.innerHeight);
    ```

6. **Add Particles**

    Add particles to the world:
    
    ```Javascript
    world.createParticle2D();
    ```

7. **Start the Engine**

    Start the engine to begin the simulation:

    ```Javascript
    yapheEngine.start()
    ```

    or

    ```Javascript
    yapheEngine.ignite();
    ```

## API Reference

### YapheEngine

#### Constructor

- `YapheEngine(constructors)`: Creates a new Yaphe Engine instance.

   - `constructors` (Object):
      - `element` (String): CSS selector for the simulation element.

#### Methods

- `create2Dworld()`: Creates a 2D world for simulating particles.

- `start()`: Starts the simulation loop.

### PhysicsWorld2D

#### Constructor

- `PhysicsWorld2D(parentElement)`: Creates a new 2D physics world.

   - `parentElement` (String): CSS selector for the parent element of the canvas.

#### Methods

- `createCanvas(width, height)`: Creates a canvas element for rendering.

- `createParticle2D()`: Creates a new 2D particle.

- `applyGravity()`: Applies gravity to particles in the world.

- `update()`: Updates the state of the world.

- `show()`: Renders the particles on the canvas.

### Particle2D

#### Constructor

- `Particle2D(pen, x, y)`: Creates a new 2D particle.

   - `pen` (CanvasRenderingContext2D): The rendering context for the canvas.
   - `x` (Number): Initial x-coordinate of the particle.
   - `y` (Number): Initial y-coordinate of the particle.

#### Methods

- `isOutOfBoundary(boundary)`: Checks if the particle is out of the specified boundary.

- `applyAcceleration(acceleration)`: Applies acceleration to the particle.

- `applyForce(force)`: Applies a force to the particle.

- `show()`: Renders the particle on the canvas.

## Example

For a complete example, refer to the provided `main.js` file in this repository.

That's it! You should now have a basic understanding of how to use the Yaphe Engine in your project. Feel free to customize and extend the engine to suit your specific needs. If you have any further questions or need assistance, please refer to the source code or reach out to the developer for support. Happy coding!
