<!-- Root Layout Nav Bar -->
<script>
	import { onMount } from 'svelte';

	/*
  Menu:
    Home
    About
    Members
    Senior Spotlight
    Contact
  */

	// import unt_logo from '$lib/assets/unt_logo.png';

	let scrollY = $state(0);
	let altNavbar = $derived.by(() => {
		if (scrollY < 30) {
			return false;
		} else {
			return true;
		}
	});
</script>

<!-- SCROLL TRACKING -->
<svelte:window bind:scrollY />

<!-- MAIN NAVBAR DISPLAY -->
<div
	class="fixed z-50 flex h-20 w-full flex-row items-center justify-between border-b-1 border-b-white/30 py-2 text-white shadow-xl
  backdrop-blur-xs transition-colors duration-250"
	class:bg-black={altNavbar}
>
	<!-- LEFT ALIGNED NAVIGATION-->
	<div class="mx-8 flex h-full flex-row items-center gap-8">
		<!-- MEAN GREEN RACING LOGO -->
		<img src="logo/untLogo.png" alt="UNT Logo" class="h-full object-contain" />

		<!-- NAVIGATION LINKS -->
		<div class="flex gap-4 font-bold">
			<a href="/">HOME</a>
			<a href="/about">ABOUT</a>
			<a href="/members">MEMBERS</a>
		</div>
	</div>

	<!-- RIGHT ALIGNED SOCIALS -->
	<div class="flex flex-row">
		<!-- FACEBOOK -->
		<p>Facebook</p>
	</div>
</div>
