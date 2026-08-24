<!-- MAIN PAGE HERO IMAGE -->
<script>
	// This component is the full screen hero image background.
	// Every few seconds this image changes to a new one
	// Preemtively loads in a "preloadedImage" for quick transitions
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { fly } from 'svelte/transition';
	import { quintIn, quintOut } from 'svelte/easing';
	import { beforeNavigate } from '$app/navigation';
  	import DotPattern from '$lib/components/DotPattern.svelte';

	//Image imports
	const firstImage = "https://myunt.sharepoint.com/sites/FSAEBusinessProject/_layouts/15/download.aspx?UniqueId=51a1f166-c125-435b-bed2-93317697ea44"
	import photo_list from '$lib/assets/sae_photos.json' with { type: "json" }
	const heroImagesValues = photo_list.map(photo => photo.src)

	const IMAGE_TIMEOUT = 3000;		// How long the component should wait per image change
	const TRANSITION_DURATION = 2000;	// in/out durations must stay <= IMAGE_TIMEOUT to avoid overlapping transitions

	let scrollY = $state(0);
	let viewportHeight = $state(0);
	let preloadedImage = $state(firstImage);
	let currentImage = $state(firstImage);

	let randomImageTimeout = null;
	function setImageTimeout() {
		// Always clear any existing timer first so we can never end up with
		// two overlapping recursive chains running at once.
		clearTimeout(randomImageTimeout);
		if (!timeoutStop && (!browser || !document.hidden)) {
			randomImageTimeout = setTimeout(async () => {
				await chooseRandomImage();
				setImageTimeout();
			}, IMAGE_TIMEOUT);
		}
	}

	// Pause the timer while the tab is backgrounded so throttled timers don't
	// pile up and burst-fire when the tab regains focus.
	function handleVisibilityChange() {
		if (document.hidden) {
			console.log('TAB HIDDEN - pausing image timer');
			clearTimeout(randomImageTimeout);
		} else if (!timeoutStop) {
			console.log('TAB VISIBLE - resuming image timer');
			setImageTimeout();
		}
	}

	onMount(async () => {
		console.log('Mounting, choosing first image...');
		navigating = false;

		await chooseRandomImage();
		setImageTimeout();

		document.addEventListener('visibilitychange', handleVisibilityChange);
	});

	onDestroy(() => {
		clearTimeout(randomImageTimeout);
		if (browser) {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		}
	});

	//Start and stop timeout handling
	let timeoutStop = false;
	$effect(() => {
		if (scrollY > viewportHeight && !timeoutStop) {
			console.log('TIMEOUT STOP');
			clearTimeout(randomImageTimeout);
			timeoutStop = true;
		}
		if (scrollY < viewportHeight && timeoutStop) {
			console.log('TIMEOUT START');
			timeoutStop = false;
			setImageTimeout();
		}
	});

	$inspect('CURRENT IMAGE: ', currentImage);

	// Chooses random image from heroImagesValues
	let old_index = 0;
	let index = 0;
	async function chooseRandomImage() {
		console.log('Choosing Image...');

		// Setting current image
		currentImage = preloadedImage;

		// Preloading next image
		while (old_index == index) {
			index = Math.floor(Math.random() * heroImagesValues.length);
		}
		old_index = index
		let imageModule = heroImagesValues[index];
		preloadedImage = imageModule;

		console.log('Preloaded Image', index);
	}

	//Disables transitions and hero timeout
	let navigating = $state(false);
	beforeNavigate(() => {
		navigating = true;
    clearTimeout(randomImageTimeout);
    console.log("TIMEOUT CLEARED");
	});
</script>

<!-- SCROLL & HEIGHT TRACKING -->
<svelte:window bind:scrollY bind:innerHeight={viewportHeight} />

<div class="relative h-screen w-full overflow-hidden bg-black">
	{#if preloadedImage}
		<img
			alt="Hero"
			src={preloadedImage}
			class="absolute inset-0 h-full w-full object-cover opacity-0"
		/>
	{/if}
	{#if currentImage}
		{#key currentImage}
			<img
				alt="Hero"
				src={currentImage}
				in:fly|global={!navigating ? { y: 25, duration: TRANSITION_DURATION, easing: quintOut } : { duration: 0 }}
				out:fly|global={!navigating ? { duration: TRANSITION_DURATION, easing: quintIn } : { duration: 0 }}
				class="absolute inset-0 h-full w-full object-cover brightness-65"
			/>
		{/key}
	{:else}
		<!-- <p>Loading...</p> -->
	{/if}

  <!-- DOT PATTERN -->
  <DotPattern fillColor="rgb(108 245 130 / 0.5)" class="[mask-image:radial-gradient(1000px_circle_at_center,transparent,white)]"/>
</div>