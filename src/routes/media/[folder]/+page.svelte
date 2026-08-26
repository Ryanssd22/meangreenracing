<script>
    // IMPORTS
    import { onMount } from 'svelte';
    import '$lib/photoswipe/photoswipe.css';
    import PhotoSwipeLightbox from '$lib/photoswipe/photoswipe-lightbox.esm.js';
    import { PUBLIC_CLOUDFLARE_S2_ENDPOINT } from '$env/static/public';

    const { data } = $props();
    
    let images = $state([]);
    let lightbox;

    // Resolve the promise and store image data
    data.gallery_response.then((response) => {
        console.log("RESPONSE:", response)
        images = response?.Contents.map(image => (PUBLIC_CLOUDFLARE_S2_ENDPOINT + image.Key));
        console.log("IMAGES:", images);
    });

    // Initialize Lightbox once images are rendered in the DOM
    $effect(() => {
        if (images.length > 0) {
            lightbox = new PhotoSwipeLightbox({
                gallery: '#my-gallery',
                children: 'a',
                pswpModule: () => import('$lib/photoswipe/photoswipe.esm.js')
            });
            lightbox.init();

            // Cleanup when component unmounts or images update
            return () => {
                lightbox.destroy();
            };
        }
    });
</script>

<div class="pswp-gallery" id="my-gallery">
    <div class="grid grid-cols-5 gap-2">
    {#each images as image}
        <!-- <a 
            href={image.url} 
            data-pswp-width={image.width} 
            data-pswp-height={image.height} 
            target="_blank"
            rel="noreferrer"
        > -->
            <img src={image} alt="" class="w-25 h-25" />
        <!-- </a> -->
    {/each}
    </div>
</div>