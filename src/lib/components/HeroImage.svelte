<!-- MAIN PAGE HERO IMAGE -->
<script>
	// This component is the full screen hero image background.
	// Every few seconds this image changes to a new one
	// Preemtively loads in a "preloadedImage" for quick transitions
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintIn, quintOut } from 'svelte/easing';
	const heroImages = import.meta.glob('/src/lib/assets/sae_photos/hero/*.jpg', {
		query: { enhanced: true }
	});

	// let currentImage = $state('$lib/assets/sae_photos/hero/9F0A3610.jpg?enhanced');
	let currentImage = $state(null);
	let preloadedImage = $state(null);
	let heroImagesValues = Object.values(heroImages);
	onMount(async () => {
		const IMAGE_INTERVAL = 4000;

		await chooseRandomImage();
		let randomImageInterval = setInterval(async () => {
			await chooseRandomImage();
		}, IMAGE_INTERVAL);
	});

	// Chooses random image from heroImagesValues
	async function chooseRandomImage() {
		console.log('Switching Image...');

		// Setting current image
		if (!preloadedImage) {
			const index = Math.floor(Math.random() * heroImagesValues.length);
      console.log("Getting", index)
			let imageModule = await heroImagesValues[index]();
			currentImage = imageModule.default;
		} else {
			currentImage = preloadedImage;
		}

		// Preloading next image
		const index = Math.floor(Math.random() * heroImagesValues.length);
		let imageModule = await heroImagesValues[index]();
		preloadedImage = imageModule.default;

		console.log('Image switched to', index);
	}

  // $inspect(currentImage);
</script>

<div class="relative h-screen w-full overflow-hidden">
	{#if currentImage}
		{#key currentImage}
			<enhanced:img
				alt="Hero"
				src={currentImage}
				in:fly={{ y: 25, duration: 2000, easing: quintOut }}
				out:fly={{ duration: 4000, easing: quintIn }}
				class="absolute inset-0 h-full w-full object-cover"
			/>
		{/key}
	{:else}
		<p>Loading...</p>
	{/if}
</div>
