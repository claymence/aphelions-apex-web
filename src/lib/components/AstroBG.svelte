<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let canvas: HTMLCanvasElement | null = null;
	let ctx: CanvasRenderingContext2D | null = null;
	let canvasSize: { width: number; height: number } = { width: 800, height: 800 };

	function resizeCanvas(): void {
		if (!canvas || !canvas.parentElement) {
			console.error('Canvas or its parent element is not available.');
			return;
		}

		const container = canvas.parentElement;
		canvasSize = {
			width: container.clientWidth || 800,
			height: container.clientHeight || 800
		};

		canvas.width = canvasSize.width;
		canvas.height = canvasSize.height;
		draw();
	}

	function draw(): void {
		if (!ctx || !canvas) {
			console.error('Canvas context is not available.');
			return;
		}

		// Clear the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Scale factor to fit the original design into the current canvas size
		const scale = Math.min(canvas.width / 800, canvas.height / 800);

		// Calculate offsets to center the drawing
		const offsetX = (canvas.width - 800 * scale) / 2;
		const offsetY = (canvas.height - 800 * scale) / 2;

		// Draw Sun
		ctx.beginPath();
		ctx.arc(offsetX + 400 * scale, offsetY + 400 * scale, 20 * scale, 0, Math.PI * 2);
		ctx.fillStyle = '#888';
		ctx.fill();

		// Draw Orbit 1
		ctx.beginPath();
		ctx.arc(offsetX + 400 * scale, offsetY + 400 * scale, 80 * scale, 0, Math.PI * 2);
		ctx.strokeStyle = '#666';
		ctx.lineWidth = 1 * scale;
		ctx.stroke();

		// Draw Planet on Orbit 1
		ctx.beginPath();
		ctx.arc(offsetX + 480 * scale, offsetY + 400 * scale, 6 * scale, 0, Math.PI * 2);
		ctx.fillStyle = '#aaa';
		ctx.fill();

		// Draw Orbit 2
		ctx.beginPath();
		ctx.arc(offsetX + 400 * scale, offsetY + 400 * scale, 140 * scale, 0, Math.PI * 2);
		ctx.strokeStyle = '#555';
		ctx.lineWidth = 1 * scale;
		ctx.stroke();

		// Draw Planet on Orbit 2
		ctx.beginPath();
		ctx.arc(offsetX + 540 * scale, offsetY + 400 * scale, 8 * scale, 0, Math.PI * 2);
		ctx.fillStyle = '#999';
		ctx.fill();
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			if (canvas) {
				const context = canvas.getContext('2d');
				if (context) {
					ctx = context;
					resizeCanvas();
					window.addEventListener('resize', resizeCanvas);
				} else {
					console.error('Failed to get canvas context.');
				}
			} else {
				console.error('Canvas element is not available.');
			}
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', resizeCanvas);
		}
	});
</script>

<canvas bind:this={canvas}></canvas>
