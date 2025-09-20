<!-- MEMBERS PAGE -->
<script>
  import headshot_descriptions from '$lib/headshots/headshot_descriptions.json'
  const headshot_images = import.meta.glob('$lib/headshots/*.jpg');
</script>

<div class="p-4 flex flex-center items-center w-full">
  <!-- HEADSHOT GRID -->
  <div class="grid grid-cols-3 gap-4 w-full">

    <!-- HEADSHOT COMPONENT -->
    {#each headshot_descriptions as headshot}
      <div class="flex flex-col">
        <div class="w-50 h-60 rounded-md overflow-hidden">
          {#await headshot_images[`/src/lib/headshots/${headshot.image}`]() then {default: src}}
            <img {src} alt={headshot.name} class="w-full h-full object-cover"/>
          {/await}
        </div>
        <h2 class="font-bold">{headshot.name}</h2>
        <h3 class="italic">{headshot.title}</h3>
        <p>{headshot.description}</p>
      </div>
    {/each}

  </div>
</div>
