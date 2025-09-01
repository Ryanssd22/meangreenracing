<!-- ROOT LAYOUT -->
<script lang="ts">
	import '../app.css';
	import unt_logo_eagle from '$lib/assets/unt_logo_eagle.png';
	import NavBar from '$lib/components/NavBar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={unt_logo_eagle} />
</svelte:head>

<!-- FULL DIV -->
<div class="h-full w-full">
	<!-- NAVBAR -->
	<NavBar />

	<!-- MAIN CONTENT -->
	{@render children?.()}
</div>
