<!--CARS-->
<script>
    // Gaussian Splats
    const splats = [
        {
            "title": "F26",
            "src": "/splat/seacar.html"
        },
        {
            "title": "F17",
            "src": "/splat/f17.html"
        },
    ]
</script>

<div>
    {#each splats as splat}
        <iframe title={splat.title} src={splat.src} class="w-[70em] h-[50em]"></iframe>
    {/each}
    <!-- <iframe title="car" src="/splat/saecar.html" class="w-[70em] h-[50em]">
    </iframe>

    <iframe title="f17" src="/splat/f17.html" class="w-[70em] h-[50em]">
    </iframe> -->
</div>