<script>
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import AutoScroll from 'embla-carousel-auto-scroll';
	import headshot_descriptions from '$lib/headshots/headshot_descriptions.json';
	const headshot_images = import.meta.glob('$lib/headshots/*.png');

	let emblaApi;
	const options = {
		loop: true,
		startIndex: 1
	};
	const plugins = [AutoScroll()];

	//Initializes Embla API
	function onInit(event) {
		emblaApi = event.detail;
		console.log('EmblaAPI:', emblaApi);
	}

	//Scrolling
	function scrollPrev() {
		console.log('SCROLLING PREVIOUS');
		if (emblaApi) emblaApi.scrollPrev();
	}
	function scrollNext() {
		if (emblaApi) emblaApi.scrollNext();
	}
</script>

<div class="embla w-full">
	<!-- CAROUSEL -->
	<div
		class="embla__viewport relative"
		use:emblaCarouselSvelte={{ options, plugins }}
		onemblaInit={onInit}
	>
		<div class="embla__container my-2">
			{#each headshot_descriptions as headshot (headshot.name)}
				<div class="embla__slide flex-center flex w-full items-center">
					<div class="m-auto flex flex-col">
						<div class="h-60 w-50 overflow-hidden rounded-md">
							{#await headshot_images[`/src/lib/headshots/${headshot.image}`]() then { default: src }}
								<img {src} alt={headshot.name} class="h-full w-full object-cover" />
							{/await}
						</div>
						<h2 class="font-bold">{headshot.name}</h2>
						<h3 class="italic">{headshot.title}</h3>
						<p>{headshot.description}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- GRADIENT -->
		<!-- <div -->
		<!-- 	class="from-1% to-99% absolute inset-0 h-full w-full bg-gradient-to-r from-white via-white/0 via-50% to-white" -->
		<!-- ></div> -->
	</div>

	<!-- BUTTONS -->
	<div class="flex gap-2">
		<button class="embla__prev cursor-pointer" onclick={scrollPrev}>Prev</button>
		<button class="embla__next cursor-pointer" onclick={scrollNext}>Next</button>
	</div>
</div>

<style>
	.embla {
		overflow: hidden;
	}
	.embla__container {
		display: flex;
	}
	.embla__slide {
		flex: 0 0 100%;
		min-width: 0;
	}

	/* @media (width >= 64rem) { */
	/* 	.embla__slide { */
	/* 		flex: 0 0 25%; */
	/* 	} */
	/* } */
</style>
