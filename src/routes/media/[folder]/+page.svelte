<!--
To create the thumbnails for the images, use Magick:
Get-ChildItem *.webp | ForEach-Object { magick $_.FullName -resize "380x380^" -gravity center -extent 380x380 "$($_.BaseName)_thumb.webp" }
-->

<script>
    // IMPORTS
    import { onMount } from 'svelte';
    import '$lib/photoswipe/photoswipe.css';
    import PhotoSwipeLightbox from '$lib/photoswipe/photoswipe-lightbox.esm.js';
    import { PUBLIC_CLOUDFLARE_S2_ENDPOINT } from '$env/static/public';
    import { page } from '$app/state';
    import { fly } from 'svelte/transition';
    import { browser } from '$app/env';
    import { tick } from 'svelte';

    const { data } = $props();

    // CLOUDFLARE WORKER
    const CLOUDFLARE_WORKER = "https://still-hall-23d4.benedictrsimeon.workers.dev/?img="

    // GETTING CLOUDFLARE IMAGES
    let images = $state([]);
    let lightbox = undefined;
    let gallery_loaded = $state(false);
    data.gallery_response.then(async (response) => {
        console.log("RESPONSE:", response)
        const image_links = response?.Contents.map(image => (PUBLIC_CLOUDFLARE_S2_ENDPOINT + image.Key));
        // images.shift();
        images = image_links.map(link => ({"link": link, dimensions: getImageDimensions(link)}));
        console.log("IMAGES:", images);

        // PHOTOSWIPE Lightbox initialization
        if (browser) {
            gallery_loaded = true;

            await tick();   // Wait for DOM to load

            lightbox = new PhotoSwipeLightbox({
                gallery: '#gallery--main',
                children: 'a',
                pswpModule: () => import('$lib/photoswipe/photoswipe.esm.js')
            });
            lightbox.init();
        }
    });

    // Image utilities
    const getImageDimensions = (url) => {
        if (browser) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                
                // img.decode() ensures the image is fully loaded and ready to display
                img.decode()
                .then(() => {
                    resolve({
                    width: img.naturalWidth,
                    height: img.naturalHeight
                    });
                })
                .catch((err) => reject(new Error("Failed to load image: " + err)));
            });
        }
    };
</script>

<div class="flex flex-col items-center min-h-screen">
    <h2 class="font-bold text-2xl">MEDIA TEST</h2>
    <!-- <div class="pswp-gallery grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4" id="gallery--main"> -->
    {#if images.length != 0 && gallery_loaded}
        <div class="pswp-gallery grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4" id="gallery--main">
        <!-- <div class="pswp-gallery" id="gallery--main"> -->
        {#each images.entries() as [i, image]}
            <a in:fly|global={{delay: i*10}} class="block w-40 h-40 bg-blue-500 overflow-hidden" 
                target="_blank" href={image.link}
                data-pswp-height="1080" data-pswp-width="1920"
                rel="noreferrer">
                <p class="text-[8px]">{image.link.slice(PUBLIC_CLOUDFLARE_S2_ENDPOINT.length + page.params?.folder.length + 8)}</p>
                 <!-- <img src={image} alt="" class="w-40 h-50 object-cover"/> -->
            </a>
        {/each}
        </div>
    {:else}
        <h2>Loading...</h2>
    {/if}
    <!-- </div> -->
</div>