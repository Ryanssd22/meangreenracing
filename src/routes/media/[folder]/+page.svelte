<script>
    // IMPORTS
    import { onMount } from 'svelte';
    import '$lib/photoswipe/photoswipe.css';
    import PhotoSwipeLightbox from '$lib/photoswipe/photoswipe-lightbox.esm.js';
    import { PUBLIC_CLOUDFLARE_S2_ENDPOINT } from '$env/static/public';
    import { page } from '$app/state';
    import { fly } from 'svelte/transition';

    const { data } = $props();

    // GETTING CLOUDFLARE IMAGES
    let images = $state([]);
    data.gallery_response.then((response) => {
        console.log("RESPONSE:", response)
        images = response?.Contents.map(image => (PUBLIC_CLOUDFLARE_S2_ENDPOINT + image.Key));
        images.shift();
        console.log("IMAGES:", images);
    });
    let test = $state([1,2,3,4])

    // PHOTOSWIPE SETUP
    onMount(() => {
        const lightbox = new PhotoSwipeLightbox({
            gallery: '#gallery--main',
            children: 'a',
            pswpModule: () => import('$lib/photoswipe/photoswipe.esm.js')
        });
        lightbox.init();
    })
</script>

<div class="flex flex-col items-center min-h-screen">
    <h2 class="font-bold text-2xl">MEDIA TEST</h2>
    {#if images.length != 0}
        <div class="pswp-gallery grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4" id="gallery--main">
        {#each images.entries() as [i, image]}
            <a in:fly|global={{delay: i*10}} class="block w-40 h-40 bg-blue-500 overflow-hidden" 
                data-pswp-srcset={image} 
                target="_blank" href={image}
                data-pswp-height="1080" data-pswp-width="1920"
                rel="noreferrer">
                <p class="text-[8px]">{image.slice(PUBLIC_CLOUDFLARE_S2_ENDPOINT.length + page.params?.folder.length + 8)}</p>
                 <!-- <img src={image} alt="" class="w-40 h-50 object-cover"/> -->
            </a>
        {/each}
        </div>
    {:else}
        <h2>Loading...</h2>
    {/if}
</div>