// Ported from ref-files/shader_mount.js — no Framer dependencies

const vertexShaderSource = `#version 300 es
layout(location = 0) in vec4 a_position;

void main() {
  gl_Position = a_position;
}
`;

function createShader(
    gl: WebGL2RenderingContext,
    type: number,
    source: string
): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(
            "An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader)
        );
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(
    gl: WebGL2RenderingContext,
    vertexSrc: string,
    fragmentSrc: string
): WebGLProgram | null {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSrc);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);
    if (!vertexShader || !fragmentShader) return null;

    const program = gl.createProgram();
    if (!program) return null;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(
            "Unable to initialize the shader program: " +
            gl.getProgramInfoLog(program)
        );
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return null;
    }

    // Clean up shaders after successful linking
    gl.detachShader(program, vertexShader);
    gl.detachShader(program, fragmentShader);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return program;
}

type UniformValue = number | boolean | number[];
type Uniforms = Record<string, UniformValue>;

export class ShaderMount {
    private canvas: HTMLCanvasElement;
    private gl: WebGL2RenderingContext;
    private program: WebGLProgram | null = null;
    private uniformLocations: Record<string, WebGLUniformLocation | null> = {};
    private fragmentShader: string;
    private rafId: number | null = null;
    private lastFrameTime = 0;
    private totalAnimationTime = 0;
    private speed: number;
    private providedUniforms: Uniforms;
    private hasBeenDisposed = false;
    private resolutionChanged = true;
    private resizeObserver: ResizeObserver | null = null;

    constructor(
        canvas: HTMLCanvasElement,
        fragmentShader: string,
        uniforms: Uniforms = {},
        webGlContextAttributes?: WebGLContextAttributes,
        speed = 1,
        seed = 0
    ) {
        this.canvas = canvas;
        this.fragmentShader = fragmentShader;
        this.providedUniforms = uniforms;
        this.speed = speed;
        this.totalAnimationTime = seed;

        const gl = canvas.getContext("webgl2", webGlContextAttributes);
        if (!gl) throw new Error("WebGL2 not supported");
        this.gl = gl;

        this.initWebGL();
        this.setupResizeObserver();
        this.setSpeed(speed);
        this.canvas.setAttribute("data-paper-shaders", "true");
    }

    private initWebGL() {
        const program = createProgram(
            this.gl,
            vertexShaderSource,
            this.fragmentShader
        );
        if (!program) return;
        this.program = program;
        this.setupPositionAttribute();
        this.setupUniforms();
    }

    private setupPositionAttribute() {
        if (!this.program) return;
        const positionAttributeLocation = this.gl.getAttribLocation(
            this.program,
            "a_position"
        );
        const positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array(positions),
            this.gl.STATIC_DRAW
        );
        this.gl.enableVertexAttribArray(positionAttributeLocation);
        this.gl.vertexAttribPointer(
            positionAttributeLocation,
            2,
            this.gl.FLOAT,
            false,
            0,
            0
        );
    }

    private setupUniforms() {
        if (!this.program) return;
        this.uniformLocations = {
            u_time: this.gl.getUniformLocation(this.program, "u_time"),
            u_pixelRatio: this.gl.getUniformLocation(this.program, "u_pixelRatio"),
            u_resolution: this.gl.getUniformLocation(this.program, "u_resolution"),
            ...Object.fromEntries(
                Object.keys(this.providedUniforms).map((key) => [
                    key,
                    this.gl.getUniformLocation(this.program!, key),
                ])
            ),
        };
    }

    private setupResizeObserver() {
        this.resizeObserver = new ResizeObserver(() => this.handleResize());
        this.resizeObserver.observe(this.canvas);
        this.handleResize();
    }

    private handleResize() {
        const pixelRatio = window.devicePixelRatio;
        const newWidth = this.canvas.clientWidth * pixelRatio;
        const newHeight = this.canvas.clientHeight * pixelRatio;
        if (
            this.canvas.width !== newWidth ||
            this.canvas.height !== newHeight
        ) {
            this.canvas.width = newWidth;
            this.canvas.height = newHeight;
            this.resolutionChanged = true;
            this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
            this.render(performance.now());
        }
    }

    private render = (currentTime: number) => {
        if (this.hasBeenDisposed) return;
        const dt = currentTime - this.lastFrameTime;
        this.lastFrameTime = currentTime;

        if (this.speed !== 0) {
            this.totalAnimationTime += dt * this.speed;
        }

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.useProgram(this.program);
        this.gl.uniform1f(
            this.uniformLocations.u_time,
            this.totalAnimationTime * 0.001
        );

        if (this.resolutionChanged) {
            this.gl.uniform2f(
                this.uniformLocations.u_resolution,
                this.gl.canvas.width,
                this.gl.canvas.height
            );
            this.gl.uniform1f(
                this.uniformLocations.u_pixelRatio,
                window.devicePixelRatio
            );
            this.resolutionChanged = false;
        }

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

        if (this.speed !== 0) {
            this.requestRender();
        } else {
            this.rafId = null;
        }
    };

    private requestRender() {
        if (this.rafId !== null) cancelAnimationFrame(this.rafId);
        this.rafId = requestAnimationFrame(this.render);
    }

    private updateProvidedUniforms() {
        if (!this.program) return;
        this.gl.useProgram(this.program);
        Object.entries(this.providedUniforms).forEach(([key, value]) => {
            const location = this.uniformLocations[key];
            if (location !== null && location !== undefined) {
                if (Array.isArray(value)) {
                    switch (value.length) {
                        case 2:
                            this.gl.uniform2fv(location, value);
                            break;
                        case 3:
                            this.gl.uniform3fv(location, value);
                            break;
                        case 4:
                            this.gl.uniform4fv(location, value);
                            break;
                        default:
                            if (value.length === 9)
                                this.gl.uniformMatrix3fv(location, false, value);
                            else if (value.length === 16)
                                this.gl.uniformMatrix4fv(location, false, value);
                    }
                } else if (typeof value === "number") {
                    this.gl.uniform1f(location, value);
                } else if (typeof value === "boolean") {
                    this.gl.uniform1i(location, value ? 1 : 0);
                }
            }
        });
    }

    setSeed(newSeed: number) {
        const oneFrameAt120Fps = 1000 / 120;
        this.totalAnimationTime = newSeed * oneFrameAt120Fps;
        this.lastFrameTime = performance.now();
        this.render(performance.now());
    }

    setSpeed(newSpeed = 1) {
        this.speed = newSpeed;
        if (this.rafId === null && newSpeed !== 0) {
            this.lastFrameTime = performance.now();
            this.rafId = requestAnimationFrame(this.render);
        }
        if (this.rafId !== null && newSpeed === 0) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    setUniforms(newUniforms: Uniforms) {
        this.providedUniforms = { ...this.providedUniforms, ...newUniforms };
        this.updateProvidedUniforms();
        this.render(performance.now());
    }

    dispose() {
        this.hasBeenDisposed = true;
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
        if (this.gl && this.program) {
            this.gl.deleteProgram(this.program);
            this.program = null;
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
            this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
            this.gl.getError();
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
        this.uniformLocations = {};
    }
}
