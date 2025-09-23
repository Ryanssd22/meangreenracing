<!-- MEMBERS PAGE -->
<script>
	import headshot_descriptions from '$lib/headshots/headshot_descriptions.json';
  import { fly } from 'svelte/transition';
	const headshot_images = import.meta.glob('$lib/headshots/*.webp');

</script>

<div class="flex-center flex flex-col w-full items-center p-4">
  <!-- TITLE -->
  <h1 class="font-bold text-green-700 text-6xl">Our Crew</h1>

	<!-- HEADSHOT GRID -->
	<div class="grid w-full grid-cols-3 gap-4">
		<!-- HEADSHOT COMPONENT -->
		{#each headshot_descriptions as headshot, i (headshot.name)}
			<div class="flex flex-col flex-center items-center">
				<div class="relative h-70 w-60 overflow-hidden rounded-md">
          <!-- GRADIENT BACKGROUND -->
          <div in:fly={{ y:5 }} class="absolute inset-0 bg-gradient-to-t from-green-700 from-10% to-80% to-white/0 z-0"></div>

          <!-- HEADSHOT IMAGE -->
					{#await headshot_images[`/src/lib/headshots/${headshot.image}`]() then { default: src }}
						<img in:fly={{ y:5, delay: 50*i }} {src} alt={headshot.name} class="absolute inset-0 z-30 h-full w-full object-cover" />
					{/await}
				</div>
				<h2 class="font-bold text-lg">{headshot.name}</h2>
				<h3 class="italic">{headshot.title}</h3>
				<p>{headshot.description}</p>
			</div>
		{/each}
	</div>
</div>
