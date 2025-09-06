<!-- Root Layout Nav Bar -->
<script>
	/*
  Menu:
    Home
    About
    Members
    Senior Spotlight
    Contact
  */

	// import unt_logo from '$lib/assets/unt_logo.png';
	import { page } from '$app/state';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	let pathname = $derived(page.url.pathname);

	let scrollY = $state(0);
	let altNavbar = $derived.by(() => {
		if (pathname == '/') {
			if (scrollY < 200) {
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	});

	let navigating = $state(false);
	beforeNavigate(() => {
		navigating = true;
	});
	afterNavigate(() => {
		navigating = false;
	});
</script>

<!-- SCROLL TRACKING -->
<svelte:window bind:scrollY />

<!-- MAIN NAVBAR DISPLAY -->
<div
	class="fixed z-50 flex h-20 w-full flex-row items-center justify-between border-b-1 border-b-white/30 py-2 text-white shadow-xl
  backdrop-blur-xs transition-colors"
	class:duration-250={!navigating}
	class:duration-0={navigating}
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
