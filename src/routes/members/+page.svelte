<!-- MEMBERS PAGE -->
<script>
	import headshots from '$lib/headshot_descriptions.json';
  import { fly } from 'svelte/transition';
  import crew_banner from '$lib/assets/sae_photos/banners/crew_banner.webp';
  import PageHeader from '$lib/components/PageHeader.svelte';

  const headshot_descriptions = headshots[0].details  
</script>

<div class="flex-center flex flex-col w-full items-center">
  <!-- TITLE BANNER -->
  <PageHeader src={crew_banner} alt="Crew Banner" title="Our Crew"/>

  <!-- HEADSHOTS COMPONENT -->
  <div class="flex-col h-full flex w-full justify-center p-4">
    {#each headshot_descriptions as position, i (position.position)}
      <div class="flex flex-col justify-center items-center mt-4">
        <h2 class="font-[Bronzier] tracking-wide text-5xl font-bold italic">{position.position}</h2>

        <!-- HEADSHOT GRID -->
        <div class="grid w-full grid-cols-3 gap-4">
          {#each position.members as member, i (member.name)} 
            <!-- HEADSHOT COMPONENT -->
            <div class="group flex flex-col flex-center items-center hover:rotate-1 hover:scale-104 transition-all duration-800">
              <div class="relative h-70 w-60 overflow-hidden rounded-md">
                <!-- GRADIENT BACKGROUND -->
                <div in:fly={{ y:5 }} class="absolute inset-0 bg-gradient-to-t from-green-700 from-10% to-80% to-white/0 z-0 transition-colors group-hover:from-green-600"></div>

                <!-- HEADSHOT IMAGE -->
                <img in:fly={{ y:5, delay: 50*i }} src={member.image} alt={member.name} class="absolute inset-0 z-30 h-full w-full object-cover transition-all duration-100 group-hover:opacity-0" />
                <img
                  src={member.image_hover}
                  alt={member.name}
                  class="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-100 group-hover:opacity-100"
                />
              </div>
              <h2 class="font-bold text-lg">{member.name}</h2>
              <h3 class="italic">{member.title}</h3>
              <p>{member.description}</p>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
  <div>
    <p>Click to see old crew</p>
  </div>
</div>
