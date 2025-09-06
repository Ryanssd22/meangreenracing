<!-- ROOT LAYOUT -->
<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';

	import { page } from '$app/state';
	let pathname = $derived(page.url.pathname);

	let { children } = $props();

	// Navigation Links
	const navLinks = [
		{ url: '/', name: 'Home' },
		{ url: 'about', name: 'About' },
		{ url: 'members', name: 'Members' }
	];
</script>

<svelte:head>
	<link rel="icon" href="logo/untLogoEagle.png" />
</svelte:head>

<!-- FULL DIV -->
<div class="h-full w-full font-[Montserrat]">
	<!-- NAVBAR -->
	<NavBar />

	<!-- MAIN CONTENT -->
	<div class="relative" class:top-20={pathname != '/'}>
		{@render children?.()}

		<!-- FOOTER -->
		<div class="flex w-full bg-green-700 px-16 py-8 text-white">
			<!-- NAVIGATION LINKS -->
			<div class="flex flex-col">
				<h2 class="font-bold">Navigate</h2>
				<ul>
					{#each navLinks as link (link.url)}
						<li>
							<a href={link.url}>{link.name}</a>
						</li>
					{/each}
					<!-- <li><a href="/">Home</a></li> -->
					<!-- <li><a href="about">About</a></li> -->
					<!-- <li><a href="members">Members</a></li> -->
				</ul>
			</div>

			<!-- COPYRIGHT -->

			<!-- SOCIAL MEDIA -->
		</div>
	</div>
</div>
