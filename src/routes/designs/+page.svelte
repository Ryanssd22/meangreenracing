<!-- SENIOR DESIGNS -->
<script>
	import design_banner from '$lib/assets/sae_photos/banners/design_banner.webp';
  import PageHeader from '$lib/components/PageHeader.svelte';
	import designs from '$lib/designs/designs.json';
	const design_images = import.meta.glob('$lib/designs/*.webp');
	import { fly } from 'svelte/transition';
</script>

<!-- HEADER -->
<PageHeader src={design_banner} alt="Design Banner" title="Senior Designs"/>

<!-- SENIOR DESIGNS BY YEAR -->
<div class="flex flex-col p-4 justify-center items-center">
  {#each designs as year (year.year)}
    <h2 class="text-5xl font-bold mt-4 mb-1">{year.year}</h2>

    <div class="w-2/3 rounded-lg border-1 border-black p-4">
      {#each year.designs as design (design.image)}
        <div class="flex overflow-hidden">
          <!-- NAME -->
          <div class="w-1/2">
            <h3 class="text-2xl">{design.name}</h3>
          </div>
          <!-- DESIGN IMAGE -->
          <div class="w-1/2">
            {#await design_images[`/src/lib/designs/${design.image}`]() then { default: src }}
              <img {src} alt={design.name} class="object-contain" />
            {/await}
          </div>
        </div>
      {/each}
    </div>

  {/each}
</div>
