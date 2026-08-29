<!-- CREW CAROUSEL -->
<script>
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import AutoScroll from 'embla-carousel-auto-scroll';
	import headshot_descriptions from '$lib/headshot_descriptions.json';
	import { PUBLIC_CLOUDFLARE_S2_ENDPOINT } from '$env/static/public';

	let emblaApi;
	const options = {
		loop: true,
		startIndex: 1,
		dragFree: true
	};
	const plugins = [AutoScroll({ speed: 1 })];

	//Convert headshot_descriptions into array of members
	let headshot_members = $state([]);
	let current_year = $state(0);
	headshot_descriptions[current_year].details.forEach((position) => {
		let members = position.members;
		headshot_members = headshot_members.concat(members);
	})

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
			{#each headshot_members as headshot (headshot.name)}
				<div class="embla__slide flex-center flex w-full items-center">
					<div class="m-auto flex flex-col">
						<!-- PHOTO -->
						<div
							class="group relative h-60 w-50 overflow-hidden rounded-md transition-all duration-400 hover:scale-104 hover:rotate-1"
						>
							<!-- GRADIENT BACKGROUND -->
							<div
								class="absolute inset-0 bg-gradient-to-t from-green-800 from-20% to-white/0 to-80% transition-colors group-hover:from-green-600"
							></div>

							<!-- HEADSHOT IMAGE -->
							<img
								src={PUBLIC_CLOUDFLARE_S2_ENDPOINT + headshot.image}
								alt={headshot.name}
								class="absolute inset-0 h-full w-full object-cover opacity-100 transition-all duration-800 group-hover:scale-105 group-hover:opacity-0"
							/>
							<img
								src={PUBLIC_CLOUDFLARE_S2_ENDPOINT + headshot.image_hover}
								alt={headshot.name}
								class="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-800 group-hover:opacity-100"
							/>
						</div>

						<!-- HEADSHOT DESCRIPTION -->
						<h2 class="mt-1 font-bold">{headshot.name}</h2>
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
	<!-- <div class="flex gap-2"> -->
	<!-- 	<button class="embla__prev cursor-pointer" onclick={scrollPrev}>Prev</button> -->
	<!-- 	<button class="embla__next cursor-pointer" onclick={scrollNext}>Next</button> -->
	<!-- </div> -->
</div>

<style>
	.embla {
		overflow: hidden;
	}
	.embla__container {
		display: flex;
	}
	.embla__slide {
		flex: 0 0 80%;
		min-width: 0;
	}

	/* TABLET */
	@media (width >= 48rem) {
		.embla__slide {
			flex: 0 0 28%;
		}
	}

	/* DESKTOP SITE */
	@media (width >= 64rem) {
		.embla__slide {
			flex: 0 0 20%;
		}
	}
</style>
