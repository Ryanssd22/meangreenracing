<!--
A page which stores a BUNCH of our photos and videos!
The media is stored in the vercel blob
-->
<script>
    // Component Imports
    import PageHeader from '$lib/components/PageHeader.svelte';
    import media_banner from '$lib/assets/sae_photos/banners/media_banner.webp';
    import Card3D from './Card3D.svelte';

    // Gallery imports
    import media_folders from './media_folders.json'
    // const { data } = $props();
    // const gallery_promise = data.gallery_response;
    // gallery_promise.then((response) => {
    //     console.log("GALLERY RESPONSE", response);
    // })

</script>

<div class="flex-center flex flex-col w-full items-center">
    <PageHeader src={media_banner} alt="Media Banner" title="Our Media"/>
    <div class="flex flex-col w-full h-full">
        {#each Object.entries(media_folders).sort((a, b) => Number(b[0]) - Number(a[0])) as [year, folders]}
            <h2 class="text-2xl font-bold">{year}</h2>
            <div class="grid grid-cols-3">
                {#each folders as folder}
                    <div class="p-5">
                        <Card3D width="250px" height="400px" title={folder.title} thumbnail={folder.thumbnail} navigation_link={'/media/' + year + '_' + folder.folder_name}/>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</div>

