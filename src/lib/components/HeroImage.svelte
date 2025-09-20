<!-- MAIN PAGE HERO IMAGE -->
<script>
	// This component is the full screen hero image background.
	// Every few seconds this image changes to a new one
	// Preemtively loads in a "preloadedImage" for quick transitions
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintIn, quintOut } from 'svelte/easing';
	import { beforeNavigate } from '$app/navigation';
	const heroImages = import.meta.glob('/src/lib/assets/sae_photos/hero/*.jpg', {
		query: { enhanced: true }
	});
	// const heroImages = import.meta.glob('/src/lib/assets/sae_photos/hero/*.jpg?enhanced=true')

	// let currentImage = $state('$lib/assets/sae_photos/hero/9F0A3610.jpg?enhanced');
	let scrollY = $state(0);
	let viewportHeight = $state(0);
	let currentImage = $state(null);
	let preloadedImage = $state(null);
	let heroImagesValues = Object.values(heroImages);
	let randomImageTimeout = undefined;
	onMount(async () => {
		await chooseRandomImage();
		// let randomImageInterval = setInterval(async () => {
		// 	await chooseRandomImage();
		// }, IMAGE_INTERVAL);
		setImageTimeout();
	});
	async function setImageTimeout() {
		const IMAGE_TIMEOUT = 4000;
		randomImageTimeout = setTimeout(async () => {
			await chooseRandomImage();
			setImageTimeout();
		}, IMAGE_TIMEOUT);
	}

	//Start and stop timeout handling
	let timeoutStop = false;
	$effect(() => {
		if (scrollY > viewportHeight && !timeoutStop) {
			console.log('TIMEOUT STOP');
      clearTimeout(randomImageTimeout);
			timeoutStop = true;
		}
    if ((scrollY < viewportHeight) && timeoutStop) {
      console.log('TIMEOUT START');
      timeoutStop = false;
      setImageTimeout();
    }
	});

	$inspect('CURRENT IMAGE: ', currentImage);

	// Chooses random image from heroImagesValues
	async function chooseRandomImage() {
		console.log('Switching Image...');

		// Setting current image
		if (!preloadedImage) {
			const index = Math.floor(Math.random() * heroImagesValues.length);
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

	//Disables transitions
	let navigating = $state(false);
	beforeNavigate(() => {
		navigating = true;
	});

	// $inspect(currentImage);
</script>

<!-- SCROLL & HEIGHT TRACKING -->
<svelte:window bind:scrollY bind:innerHeight={viewportHeight} />

<div class="relative h-screen w-full overflow-hidden bg-black">
	{#if preloadedImage}
		<enhanced:img
			alt="Hero"
			src={preloadedImage}
			class="absolute inset-0 h-full w-full object-cover opacity-0"
		/>
	{/if}
	{#if currentImage}
		{#key currentImage}
			<enhanced:img
				alt="Hero"
				src={currentImage}
				in:fly|global={{ y: 25, duration: 2000, easing: quintOut }}
				out:fly|global={!navigating ? { duration: 4000, easing: quintIn } : { duration: 0 }}
				class="absolute inset-0 h-full w-full object-cover"
			/>
		{/key}
	{:else}
		<p>Loading...</p>
	{/if}
</div>
