<!--
Be sure to add images and thumbnails into cloudflare manually:
magick mogrify -format webp -quality 50 -auto-orient *
Get-ChildItem *.webp | ForEach-Object { magick $_.FullName -resize "200x" "THUMB_$($_.BaseName).webp" }
Get-ChildItem *.mp4 | ForEach-Object { ffmpeg -i $_.FullName -vf "thumbnail,scale=200:-1" -frames:v 1 "THUMB_$($_.BaseName).webp" }
-->

<script>
    import { onMount } from 'svelte';
    import '$lib/photoswipe/photoswipe.css';
    import PhotoSwipeLightbox from '$lib/photoswipe/photoswipe-lightbox.esm.js';
    import PhotoSwipeVideoPlugin from '$lib/photoswipe/photoswipe-video-plugin.esm.js'
    import { PUBLIC_CLOUDFLARE_S2_ENDPOINT } from '$env/static/public';
    import { page } from '$app/state';
    import { fly } from 'svelte/transition';
    import { browser } from '$app/env';
    import { tick } from 'svelte';

    const { data } = $props();

    const CLOUDFLARE_THUMBNAIL_LINK = PUBLIC_CLOUDFLARE_S2_ENDPOINT + 'cdn-cgi/image/width=240,fit=cover/'

    let images = $state([]);
    let lightbox = undefined;
    let gallery_loaded = $state(false);
    const folder = page.params?.folder;

    data.images.then(async (response) => {
        images = response;
        images = images.map((image) => {
            return { link: image.link, dimensions: image.dimensions, "file": image.link.slice(PUBLIC_CLOUDFLARE_S2_ENDPOINT.length + folder.length + 9)}
        })
        console.log("IMAGES:", images);

        if (browser) {
            gallery_loaded = true;

            await tick();

            lightbox = new PhotoSwipeLightbox({
                gallery: '#gallery--main',
                children: 'a', // both images and videos now share this class
                pswpModule: () => import('$lib/photoswipe/photoswipe.esm.js')
            });

            // Must be instantiated BEFORE lightbox.init()
            new PhotoSwipeVideoPlugin(lightbox, {});

            // --------------------------------------------------
            // VIDEO FIXES (Thanks Chat)
            // --------------------------------------------------

            // Don't use the gallery thumbnail as the zoom-animation source for videos.
            // Returning null means video slides will use a fade instead of thumbnail zoom.
            lightbox.addFilter('thumbEl', (thumbEl, itemData) => {
                if (itemData.type === 'video') {
                    return null;
                }

                return thumbEl;
            });


            // The video plugin explicitly enables placeholders for videos.
            // Override that behavior so the thumbnail isn't rendered behind the video.
            lightbox.addFilter('useContentPlaceholder', (usePlaceholder, content) => {
                if (content.data.type === 'video') {
                    return false;
                }

                return usePlaceholder;
            });


            // The video plugin also sets msrc as <video poster="...">.
            // Remove it so the thumbnail cannot briefly appear at full video size.
            lightbox.on('contentLoad', ({ content }) => {
                if (
                    content.data.type === 'video' &&
                    content.element instanceof HTMLVideoElement
                ) {
                    content.element.removeAttribute('poster');
                }
            });


            // Keep video dimensions synchronized with PhotoSwipe.
            lightbox.on('contentResize', (e) => {
                if (
                    e.content.data.type !== 'video' ||
                    !e.content.element
                ) {
                    return;
                }

                e.content.element.style.width = `${e.width}px`;
                e.content.element.style.height = `${e.height}px`;
            });


            // IMPORTANT:
            // Move the video out of .pswp__zoom-wrap as soon as it gets appended,
            // rather than waiting for contentActivate.
            lightbox.on('contentAppend', ({ content }) => {
                if (
                    content.data.type !== 'video' ||
                    !content.element ||
                    !content.slide?.holderElement
                ) {
                    return;
                }

                const video = content.element;
                const holder = content.slide.holderElement;
                const zoomWrap = video.parentElement;

                // Move video outside PhotoSwipe's transformed zoom layer.
                holder.appendChild(video);

                Object.assign(video.style, {
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '2'
                });

                // Nothing useful should remain in this wrapper for a video.
                if (zoomWrap?.classList.contains('pswp__zoom-wrap')) {
                    zoomWrap.style.display = 'none';
                }
            });


            lightbox.init();
        }
    });

    function isVideo(link) {
        return link.endsWith('.mp4');
    }
</script>

<div class="flex flex-col items-center min-h-screen">
    <!-- HEADER -->
    <div class="flex flex-row items-center justify-between w-full h-20 px-10">
        <a href="/media">Back</a>
        <h2 class="font-bold text-2xl">{page.params.folder.slice(5)}</h2>
        <div></div>
    </div>

    <!-- GALLERY -->
    {#if images.length != 0 && gallery_loaded}
        <div class="pswp-gallery grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4" id="gallery--main">
        {#each images.entries() as [i, image]}
            {#if isVideo(image.link)}
                <a in:fly|global={{delay: i*10}} class="flex flex-col pswp-item"
                    href={image.link}
                    data-pswp-width={image.dimensions.width}
                    data-pswp-height={image.dimensions.height}
                    data-pswp-type="video"
                    data-cropped="true"
                    rel="noreferrer">
                    <div class="relative w-40 h-40">
                        <!-- Hidden poster img: gives PhotoSwipe its msrc placeholder -->
                        <!-- <img src={image.link.replace('.mp4', '_poster.jpg')} alt="" class="hidden" /> -->
                        <img src={PUBLIC_CLOUDFLARE_S2_ENDPOINT + 'gallery/' + page.params.folder?.replace("_", "/") + "/THUMB_" + image.file.replace(".mp4", ".webp")} alt="" class="w-40 h-40 object-cover" />

                        <!-- <video
                            src={image.link}
                            poster={image.link.replace('.mp4', '_poster.jpg')}
                            class="w-40 h-40 object-cover"
                            muted
                            loop
                            playsinline
                            preload="metadata"
                            onmouseenter={(e) => e.currentTarget.play()}
                            onmouseleave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                        ></video> -->
                        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div class="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center">
                                <div class="w-0 h-0 border-y-[7px] border-y-transparent border-l-[11px] border-l-white ml-1"></div>
                            </div>
                        </div>
                    </div>
                    <!-- <p class="text-[8px]">{image.link.slice(PUBLIC_CLOUDFLARE_S2_ENDPOINT.length + page.params?.folder.length + 9)}</p> -->
                </a>
            {:else}
                {#if !image.file.startsWith("THUMB_")}
                    <a in:fly|global={{delay: i*10}} class="flex flex-col pswp-item transition-all hover:-translate-y-1"
                        href={image.link}
                        data-pswp-height={image.dimensions?.height} data-pswp-width={image.dimensions?.width}
                        data-cropped="true"
                        rel="noreferrer">
                        <img src={PUBLIC_CLOUDFLARE_S2_ENDPOINT + 'gallery/' + page.params.folder?.replace("_", "/") + "/THUMB_" + image.file} alt="" class="w-40 h-40 object-cover"/>
                        <!-- <p class="text-[8px]">{image.link.slice(PUBLIC_CLOUDFLARE_S2_ENDPOINT.length + page.params?.folder.length + 9)}</p> -->
                    </a>
                {/if}
            {/if}
        {/each}
        </div>
    {:else}
        <h2>Loading...</h2>
    {/if}
</div>

<style>
    :global(.pswp__zoom-wrap video) {
        opacity: 1 !important;
        visibility: visible !important;
        display: block !important;
        transform: translateZ(0);
        backface-visibility: hidden;
        z-index: 1;
    }
</style>