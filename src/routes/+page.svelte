<!-- LANDING PAGE -->

<script>
	//Images and components
	import HeroImage from '$lib/components/HeroImage.svelte';
	import CrewCarousel from '$lib/components/CrewCarousel.svelte';
  import F1Stripe from '$lib/components/F1Stripe.svelte';
	import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';

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
</script>

<!-- HERO COMPONENT -->
<div class="relative z-10 h-screen w-full overflow-hidden">
	<!-- HERO IMAGE -->
	<div class="absolute inset-0 scale-103">
		<HeroImage />
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
        <p in:fly={{ y:10, delay: 300 }} class="text-lg mb-8">Forming the Next Generation of Engineers</p>

        <a in:fly={{ y:10, delay: 450 }} href="/members" class="overflow-hidden relative group bg-green-700 w-32 h-10 transform -skew-x-12 items-center flex justify-center">
          <div class="bg-green-600 absolute w-full h-full -translate-x-full transition-all group-hover:translate-x-0"></div>
          <p class="relative">Contact Us</p>
        </a>

      {/if}
    </div>

		<!-- <div class="w-1/2"></div> -->
		<!-- <div class="flex flex-center w-full flex-col items-center justify-center"> -->
			<!-- <h1 class="md:text-7xl lg:text-8xl font-bold text-shadow-lg/90"> -->
				<!-- Forming the Next Generation of -->
				<!-- <div class="h-30 w-full overflow-hidden"> -->
				<!-- 	{#key hero_text} -->
				<!-- 		<div in:fly={{ y: 5, delay: 400 }} out:fly={{ y: -5, duration: 400 }}>{hero_text}</div> -->
				<!-- 	{/key} -->
				<!-- </div> -->
			<!-- </h1> -->
			<!-- <button> About us </button> -->
		<!-- </div> -->
	</div>
</div>

<!-- MAIN HOME CONTENT -->
<div class="flex w-full flex-col items-center justify-center">
	<!-- ABOUT US -->
	<div class="mx-4 flex flex-row items-center justify-center gap-4 py-8">
		<!-- BODY -->
		<div class="w-1/2">
			<h2 class="mb-4 flex w-full justify-center text-5xl font-bold text-green-700">About us</h2>

			<div class="flex flex-col gap-2 indent-4">
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
				<p>
					Every year, Mean Green Racing travels to Michigan to compete in the Formula SAE Michigan
					event, a premier competition that draws top university teams from around the world. This
					event isn't just a race; it's a comprehensive evaluation of our team's work, where we're
					judged on design, cost, and business presentation, as well as the dynamic performance of
					our car. The competition includes a series of events like acceleration, skid-pad,
					autocross, and a grueling endurance race, all of which test the engineering and
					reliability of our vehicle under real-world conditions. It's the culmination of months of
					hard work, offering an unparalleled opportunity to showcase our innovative solutions and
					compete against the best in collegiate motorsports.
				</p>
			</div>
		</div>

		<!-- PHOTOS -->
		<div class="flex w-1/2 flex-col">
			<img src="sae_photos/home/michigan.jpg" alt="" />
		</div>
	</div>

	<!-- WHAT WE DO -->
	<div class="flex w-full flex-col items-center gap-4 bg-green-700 px-4 py-8 text-white">
		<!-- HEADER -->
		<h2 class="text-5xl font-bold">What We Do</h2>

		<!-- TRI SPLIT CONTENT -->
		<!-- <div class="flex gap-8"> -->
		<!--   <div class=""> -->
		<!--     <h3 class="text-2xl">Integrated Engineering</h3> -->
		<!--     <p> -->
		<!--       Hands-on experience building formula race cars while running an automotive engineering -->
		<!--       research, design, and manufacturing firm. -->
		<!--     </p> -->
		<!--   </div> -->
		<!--   <div class=""> -->
		<!--     <h3 class="text-2xl">Professional Development</h3> -->
		<!--     <p> -->
		<!--       Experience and support propels our members forward into successful careers as best-in the -->
		<!--       industry innovators, leaders, and professionals. -->
		<!--     </p> -->
		<!--   </div> -->
		<!--   <div class=""> -->
		<!--     <h3 class="text-2xl">Innovative Research</h3> -->
		<!--     <p> -->
		<!--       Groundbreaking projects redefine electric vehicle development, as the senior design team -->
		<!--       conducts industry-changing research. -->
		<!--     </p> -->
		<!--   </div> -->
		<!-- </div> -->
		<div class="grid w-full grid-cols-3 gap-x-4 gap-y-2">
			<h3 class="text-center text-2xl">Integrated Engineering</h3>
			<h3 class="text-center text-2xl">Professional Development</h3>
			<h3 class="text-center text-2xl">Innovative Research</h3>

			<p class="text-center">
				Hands-on experience building formula race cars while running an automotive engineering
				research, design, and manufacturing firm.
			</p>
			<p class="text-center">
				Experience and support propels our members forward into successful careers as best-in the
				industry innovators, leaders, and professionals.
			</p>
			<p class="text-center">
				Groundbreaking projects redefine electric vehicle development, as the senior design team
				conducts industry-changing research.
			</p>
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
