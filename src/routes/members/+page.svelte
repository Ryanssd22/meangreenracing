<!-- MEMBERS PAGE -->
<script>
	import headshot_descriptions from '$lib/headshots/headshot_descriptions.json';
	const headshot_images = import.meta.glob('$lib/headshots/*.png');
</script>

<div class="flex-center flex w-full items-center p-4">
	<!-- HEADSHOT GRID -->
	<div class="grid w-full grid-cols-3 gap-4">
		<!-- HEADSHOT COMPONENT -->
		{#each headshot_descriptions as headshot (headshot.name)}
			<div class="flex flex-col">
				<div class="h-60 w-50 overflow-hidden rounded-md">
					{#await headshot_images[`/src/lib/headshots/${headshot.image}`]() then { default: src }}
						<img {src} alt={headshot.name} class="h-full w-full object-cover" />
					{/await}
				</div>
				<h2 class="font-bold">{headshot.name}</h2>
				<h3 class="italic">{headshot.title}</h3>
				<p>{headshot.description}</p>
			</div>
		{/each}
	</div>
</div>
