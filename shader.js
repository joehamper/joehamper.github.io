// ==========================================================================
// WEBGPU PROCEDURAL BACKGROUND TEXTURE ENGINE
// Minimalist Utilitarian Shader: Mathematical Moiré & Quantum Grain Field
// Falls back to high-performance Canvas2D if WebGPU is unavailable
// ==========================================================================

class WebGPUBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    this.startTime = performance.now();
    this.device = null;
    this.context = null;
    this.pipeline = null;
    this.uniformBuffer = null;
    this.bindGroup = null;
    this.isDark = document.body.classList.contains('dark-mode');

    this.initListeners();
    this.init();
  }

  initListeners() {
    window.addEventListener('resize', () => this.onResize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = e.clientX / window.innerWidth;
      this.mouse.targetY = 1.0 - (e.clientY / window.innerHeight);
    });

    // Observer for light/dark mode switch
    const observer = new MutationObserver(() => {
      this.isDark = document.body.classList.contains('dark-mode');
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  onResize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(window.innerWidth * dpr);
    this.canvas.height = Math.floor(window.innerHeight * dpr);
  }

  async init() {
    this.onResize();
    if (!navigator.gpu) {
      this.initFallback2D();
      return;
    }

    try {
      const adapter = await navigator.gpu.requestAdapter({ powerPreference: 'low-power' });
      if (!adapter) {
        this.initFallback2D();
        return;
      }

      this.device = await adapter.requestDevice();
      this.context = this.canvas.getContext('webgpu');
      const format = navigator.gpu.getPreferredCanvasFormat();

      this.context.configure({
        device: this.device,
        format: format,
        alphaMode: 'premultiplied'
      });

      // WGSL Shader Code: Subtle procedural moiré interference wave
      const wgsl = `
        struct Uniforms {
          resolution: vec2<f32>,
          mouse: vec2<f32>,
          time: f32,
          isDark: f32,
        };

        @group(0) @binding(0) var<uniform> u: Uniforms;

        struct VertexOutput {
          @builtin(position) pos: vec4<f32>,
          @location(0) uv: vec2<f32>,
        };

        @vertex
        fn vs_main(@builtin(vertex_index) vi: u32) -> VertexOutput {
          var pos = array<vec2<f32>, 3>(
            vec2<f32>(-1.0, -1.0),
            vec2<f32>( 3.0, -1.0),
            vec2<f32>(-1.0,  3.0)
          );
          var out: VertexOutput;
          out.pos = vec4<f32>(pos[vi], 0.0, 1.0);
          out.uv = (pos[vi] + vec2<f32>(1.0)) * 0.5;
          return out;
        }

        @fragment
        fn fs_main(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
          let aspect = u.resolution.x / u.resolution.y;
          let p = (uv - vec2<f32>(0.5, 0.5)) * vec2<f32>(aspect, 1.0);
          let m = (u.mouse - vec2<f32>(0.5, 0.5)) * vec2<f32>(aspect, 1.0);

          let dist = length(p - m * 0.3);
          let t = u.time * 0.25;

          // Interference wave rings
          let wave1 = sin(dist * 28.0 - t * 1.5);
          let wave2 = sin(p.x * 16.0 + p.y * 14.0 + t);
          let wave3 = cos(length(p) * 22.0 - t * 0.8);
          
          let pattern = (wave1 * 0.45 + wave2 * 0.35 + wave3 * 0.20);
          
          // Delicate intensity curve
          let intensity = smoothstep(-0.2, 0.9, pattern) * 0.045;

          if (u.isDark > 0.5) {
            // Dark mode: faint luminous phosphor grain
            return vec4<f32>(1.0, 1.0, 1.0, intensity * 1.4);
          } else {
            // Light mode: subtle ink density grain
            return vec4<f32>(0.0, 0.0, 0.0, intensity * 0.85);
          }
        }
      `;

      const shaderModule = this.device.createShaderModule({ code: wgsl });

      this.uniformBuffer = this.device.createBuffer({
        size: 32, // 8 floats (32 bytes)
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });

      this.pipeline = this.device.createRenderPipeline({
        layout: 'auto',
        vertex: {
          module: shaderModule,
          entryPoint: 'vs_main',
        },
        fragment: {
          module: shaderModule,
          entryPoint: 'fs_main',
          targets: [{
            format: format,
            blend: {
              color: { srcFactor: 'src-alpha', dstFactor: 'one-minus-src-alpha', operation: 'add' },
              alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' }
            }
          }],
        },
        primitive: { topology: 'triangle-list' },
      });

      this.bindGroup = this.device.createBindGroup({
        layout: this.pipeline.getBindGroupLayout(0),
        entries: [{ binding: 0, resource: { buffer: this.uniformBuffer } }],
      });

      this.renderGPU();
    } catch (err) {
      console.warn('[WebGPU init notice]: falling back to 2D canvas', err);
      this.initFallback2D();
    }
  }

  renderGPU() {
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    const time = (performance.now() - this.startTime) / 1000.0;
    const uniformData = new Float32Array([
      this.canvas.width,
      this.canvas.height,
      this.mouse.x,
      this.mouse.y,
      time,
      this.isDark ? 1.0 : 0.0,
      0.0, 0.0 // padding
    ]);

    this.device.queue.writeBuffer(this.uniformBuffer, 0, uniformData);

    const commandEncoder = this.device.createCommandEncoder();
    const textureView = this.context.getCurrentTexture().createView();

    const passEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: textureView,
        clearValue: { r: 0, g: 0, b: 0, a: 0 },
        loadOp: 'clear',
        storeOp: 'store',
      }],
    });

    passEncoder.setPipeline(this.pipeline);
    passEncoder.setBindGroup(0, this.bindGroup);
    passEncoder.draw(3, 1, 0, 0);
    passEncoder.end();

    this.device.queue.submit([commandEncoder.finish()]);

    requestAnimationFrame(() => this.renderGPU());
  }

  initFallback2D() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

    const drawFallback = () => {
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

      const w = this.canvas.width;
      const h = this.canvas.height;
      ctx.clearRect(0, 0, w, h);

      const time = (performance.now() - this.startTime) / 1000.0;
      const aspect = w / h;
      const mx = this.mouse.x * w;
      const my = (1.0 - this.mouse.y) * h;

      ctx.strokeStyle = this.isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.025)';
      ctx.lineWidth = 1;

      // Draw subtle interference contour lines
      const step = 48;
      for (let r = 20; r < Math.max(w, h); r += step) {
        ctx.beginPath();
        const waveOffset = Math.sin(r * 0.04 - time) * 12;
        ctx.arc(mx, my, Math.max(2, r + waveOffset), 0, Math.PI * 2);
        ctx.stroke();
      }

      requestAnimationFrame(drawFallback);
    };

    drawFallback();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    new WebGPUBackground(canvas);
  }
});
