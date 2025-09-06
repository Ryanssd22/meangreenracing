<!-- LANDING PAGE -->

<script>
	//Images and components
	import HeroImage from '$lib/components/HeroImage.svelte';
</script>

<!-- HERO COMPONENT -->
<div class="relative z-10 h-screen w-full overflow-hidden">
	<!-- HERO IMAGE -->
	<div class="absolute inset-0 scale-103">
		<HeroImage />
	</div>

	<!-- BODY CONTENT -->
	<div class="absolute inset-0 z-20 flex h-full w-full flex-row px-10 text-white">
		<div class="w-1/2"></div>
		<div class="flex w-1/2 flex-col items-center justify-center">
			<h1 class="text-6xl font-bold text-shadow-lg/90">
				The Next-Generation of Engineers, Innovators, and Leaders
			</h1>
			<button> About us </button>
		</div>
	</div>
</div>

<!-- MAIN HOME CONTENT -->
<div class="flex w-full flex-col items-center justify-center">
	<!-- ABOUT US -->
	<div class="flex w-2/3 flex-row items-center justify-center gap-4 py-8">
		<!-- BODY -->
		<div class="w-1/2">
			<h2 class="mb-4 flex w-full justify-center text-4xl font-bold text-green-700">About us</h2>

			<div class="flex flex-col gap-2 indent-4">
				<p>
					UTA Racing is the Formula SAE team from The University of North Texas. Every year our team
					designs and builds a formula car to compete in the SAE International Formula SAE® Series
					against other universities across the globe.
				</p>
				<p>
					Mean Green Racing creates excellent professionals through hands-on experience by
					engineering competitive formula race cars. We distinguish ourselves through our commitment
					to in-house manufacturing, diverse perspectives, and personal initiative. As a student-led
					organization, we prioritize student-to-student mentorship, research, and accountability in
					the pursuit of automotive greatness.
				</p>
			</div>
		</div>

		<!-- PHOTOS -->
		<div class="flex w-1/2 flex-col">
			<img src="sae_photos/home/michigan.jpg" alt="" />
		</div>
	</div>

	<!-- WHAT WE DO -->
	<div class="flex w-full flex-col items-center gap-4 bg-green-700 px-16 py-8 text-white">
		<!-- HEADER -->
		<h2 class="text-4xl font-bold">What We Do</h2>

		<!-- TRI SPLIT CONTENT -->
		<div class="flex gap-8">
			<div class="w-1/3">
				<h3 class="text-2xl">Integrated Engineering</h3>
				<p>
					Hands-on experience building formula race cars while running an automotive engineering
					research, design, and manufacturing firm.
				</p>
			</div>
			<div class="w-1/3">
				<h3 class="text-2xl">Professional Development</h3>
				<p>
					Experience and support propels our members forward into successful careers as best-in the
					industry innovators, leaders, and professionals.
				</p>
			</div>
			<div class="w-1/3">
				<h3 class="text-2xl">Innovative Research</h3>
				<p>
					Groundbreaking projects redefine electric vehicle development, as the senior design team
					conducts industry-changing research.
				</p>
			</div>
		</div>
	</div>

	<!-- MEET OUR CREW -->
	<div class="flex flex-col py-8">
		<h2 class="text-4xl font-bold text-green-700">Meet Our Crew</h2>

		<!-- CAROUSEL (EMBLA) -->
	</div>

	<!-- CONTACT US -->
	<div class="flex w-full flex-col items-center bg-gray-100 py-8">
		<h2 class="mb-4 text-4xl font-bold text-green-700">Pit Stop</h2>
		<p>Interested in joining? Or just want to learn more about the field?</p>
	</div>
</div>
