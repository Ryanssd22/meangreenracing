<!-- LANDING PAGE -->

<script>
	//About us
	import michigan from '$lib/assets/sae_photos/home/michigan.jpg';
	import CheckerboardPattern from '$lib/components/CheckerboardPattern.svelte';
	//What we do
	import innovative from '$lib/assets/sae_photos/home/innovative.jpg';
	import integrated from '$lib/assets/sae_photos/home/integrated.jpg';
	import professional from '$lib/assets/sae_photos/home/professional.jpg';

	//Components
	import HeroImage from '$lib/components/HeroImage.svelte';
	import CrewCarousel from '$lib/components/CrewCarousel.svelte';
	import F1Stripe from '$lib/components/F1Stripe.svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	// Props from server
	let { data } = $props();

	//Ready on mount
	let ready = $state(false)
	onMount(() => {
		ready = true;
	});

	//Hero text
	const hero_text_choices = ['Engineers', 'Innovators', 'Businessmen', 'Developers'];
	const HERO_INTERVAL = 3500;
	let hero_index = $state(0);
	let hero_text = $derived(hero_text_choices[hero_index]);
	const hero_text_interval = setInterval(() => {
		const previous_index = hero_index;
		while (previous_index == hero_index) {
			hero_index = Math.floor(Math.random() * hero_text_choices.length);
		}
	}, HERO_INTERVAL);

	// Hero Image
	import { PUBLIC_CLOUDFLARE_S2_ENDPOINT } from '$env/static/public';
	let heroImagesValues = $state(["https://4fzz3fozay0zmmgv.public.blob.vercel-storage.com/hero/DSC00589%20%281%29.webp"])
	data.hero_response.then((response) => {
		console.log("HERO RESPONSE:", response);
		heroImagesValues = response?.Contents.map(content => (PUBLIC_CLOUDFLARE_S2_ENDPOINT + content.Key));
		heroImagesValues.shift();
		console.log("ARRAY:", heroImagesValues);
	})
</script>

<!-- HERO COMPONENT -->
<div class="relative z-10 h-screen w-full overflow-hidden">
	<!-- HERO IMAGE -->
	<div class="absolute inset-0 scale-103">
		<HeroImage {heroImagesValues}/>
	</div>

	<!-- BODY CONTENT -->
	<div class="absolute inset-0 z-20 flex h-full w-full flex-row justify-center px-10 text-white">

    <div class="flex flex-col items-center justify-center w-full h-full">
      {#if ready}
        <h3 in:fly={{ y:10 }} class="font-bold text-white text-xl italic">UNT • FSAE</h3>
        <div in:fly={{ y:10, delay: 150 }} class="flex items-center flex-between gap-20">
          <F1Stripe />
          <h1  class="font-[Bronzier] tracking-wide font-bold white text-8xl text-center">
            Mean Green Racing
          </h1>
          <F1Stripe />
        </div>
        <p in:fly={{ y:10, delay: 300 }} class="text-lg">Forming the Next Generation of Engineers</p>

        <a in:fly={{ y:10, delay: 450 }} href="/members" class="mt-8 overflow-hidden relative group bg-green-700 w-32 h-10 transform -skew-x-12 items-center flex justify-center">
          <div class="bg-green-600 absolute w-full h-full -translate-x-full transition-all group-hover:translate-x-0"></div>
          <p class="relative">Contact Us</p>
        </a>

      {/if}
    </div>
	</div>
</div>

<!-- MAIN HOME CONTENT -->
<div class="flex w-full flex-col items-center justify-center">
	<!-- ABOUT US -->
	<div class="relative sm:px-4 flex sm:flex-row flex-col items-center justify-center gap-4 py-8">
    <!-- BACKGROUND -->
    <div class="mask-l-from-30% absolute inset-0 w-full h-full">
      <CheckerboardPattern />
    </div>
  

		<!-- BODY -->
		<div class="w-full px-4 sm:w-1/2">
			<h2 class="mb-4 flex w-full justify-center text-5xl font-bold text-green-700">About us</h2>

			<div class="flex flex-col gap-2 indent-4 text-lg">
				<p>
					Mean Green Racing is the Formula FSAE team from The University of North Texas. Every year
					our team designs and builds a formula car to compete in the SAE International Formula
					SAE® Series against other universities across the globe.
				</p>
				<p>
					Mean Green Racing creates excellent professionals through hands-on experience by
					engineering competitive formula race cars. We distinguish ourselves through our commitment
					to in-house manufacturing, diverse perspectives, and personal initiative. As a student-led
					organization, we prioritize student-to-student mentorship, research, and accountability in
					the pursuit of automotive greatness.
				</p>
				<!-- <p> -->
				<!-- 	Every year, Mean Green Racing travels to Michigan to compete in the Formula SAE Michigan -->
				<!-- 	event, a premier competition that draws top university teams from around the world. This -->
				<!-- 	event isn't just a race; it's a comprehensive evaluation of our team's work, where we're -->
				<!-- 	judged on design, cost, and business presentation, as well as the dynamic performance of -->
				<!-- 	our car. The competition includes a series of events like acceleration, skid-pad, -->
				<!-- 	autocross, and a grueling endurance race, all of which test the engineering and -->
				<!-- 	reliability of our vehicle under real-world conditions. It's the culmination of months of -->
				<!-- 	hard work, offering an unparalleled opportunity to showcase our innovative solutions and -->
				<!-- 	compete against the best in collegiate motorsports. -->
				<!-- </p> -->
			</div>
		</div>

		<!-- PHOTOS -->
		<div class="flex w-1/2 flex-col">
			<img src={michigan} alt="" class="rounded-xl" />
		</div>
	</div>

	<!-- WHAT WE DO -->
	<div class="flex w-full flex-col items-center gap-4 bg-green-700 px-4 py-8 text-white">
		<!-- HEADER -->
		<h2 class="text-5xl font-bold">What We Do</h2>

		<!-- TRI SPLIT CONTENT -->
		<div class="flex gap-8">
		  <div class="w-1/3">
        <img src={integrated} alt="Integrated Engineering" class="rounded-xl" />
		    <h3 class="text-2xl">Integrated Engineering</h3>
		    <p>
		      Hands-on experience building formula race cars while running an automotive engineering
		      research, design, and manufacturing firm.
		    </p>
		  </div>
		  <div class="w-1/3">
        <img src={professional} alt="Integrated Engineering" class="rounded-xl" />
		    <h3 class="text-2xl">Professional Development</h3>
		    <p>
		      Experience and support propels our members forward into successful careers as best-in the
		      industry innovators, leaders, and professionals.
		    </p>
		  </div>
		  <div class="w-1/3">
        <img src={innovative} alt="Integrated Engineering" class="rounded-xl" />
		    <h3 class="text-2xl">Innovative Research</h3>
		    <p>
		      Groundbreaking projects redefine electric vehicle development, as the senior design team
		      conducts industry-changing research.
		    </p>
		  </div>
		</div>
	</div>

	<!-- MEET OUR CREW -->
	<div class="flex w-full flex-col items-center px-4 py-8">
		<h2 class="text-5xl font-bold text-green-700">Meet Our Crew</h2>

		<!-- CAROUSEL (EMBLA) -->
		<CrewCarousel />
	</div>

	<!-- CONTACT US -->
	<div class="flex w-full flex-col items-center bg-gray-100 py-8">
		<h2 class="mb-4 text-5xl font-bold text-green-700">Pit Stop</h2>
		<p>Interested in joining? Or just want to learn more about the field?</p>
	</div>
</div>

<style>
	h2 {
		font-family: Bronzier;
		letter-spacing: 0.03em;
	}
</style>
