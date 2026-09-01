<!--CARS-->
<script>
    // Gaussian Splats
    let splats = $state([
        {
            "title": "F26",
            "src": "/splat/saecar.html"
        },
        {
            "title": "F17",
            "src": "/splat/f17.html"
        },
    ])
</script>

<div class="px-2">
    {#each splats as splat}
        <h2 class="py-5 text-4xl font-bold">{splat.title}</h2>
        <iframe title={splat.title} src={splat.src} class="w-150 h-120"></iframe>
    {/each}
    <!-- <iframe title="car" src="/splat/saecar.html" class="w-[70em] h-[50em]">
    </iframe> -->

    <!-- <iframe title="f17" src="/splat/f17.html" class="w-[70em] h-[50em]">
    </iframe> -->
</div>