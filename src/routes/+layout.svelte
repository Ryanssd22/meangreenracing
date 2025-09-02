<!-- ROOT LAYOUT -->
<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/logo/untLogoEagle.png" />
</svelte:head>

<!-- FULL DIV -->
<div class="h-full w-full">
	<!-- NAVBAR -->
	<NavBar />

	<!-- MAIN CONTENT -->
	{@render children?.()}
</div>
