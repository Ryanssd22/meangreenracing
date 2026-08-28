<script>
    // IMPORTS
    import { goto } from "$app/navigation";

    // PROPS
    export let secondary = false;
    export let rotateDegree = 12;
    export let hoverScale = 1.04; // Controls card scale on hover (1 = original size)
    export let startColor = "rgba(60, 199, 97, 0.25)"; // Headlight beam glow
    export let stopColor = "rgba(0, 0, 0, 0)";
    
    export let width = "auto";
    export let height = "auto";
    export let style = "";
    export let title = "NO TITLE";
    export let subtitle = "";
    export let thumbnail = "";
    export let navigation_link = "/media";

    let cardEl;
    let rafId = null;

    function handle_click() {
        goto(navigation_link);
    }

    function handleMouseMove(e) {
        if (!cardEl) return;

        if (rafId) return;

        const clientX = e.clientX;
        const clientY = e.clientY;

        rafId = requestAnimationFrame(() => {
            const rect = cardEl.getBoundingClientRect();
            
            const x = (clientX - rect.left) / rect.width - 0.5;
            const y = (clientY - rect.top) / rect.height - 0.5;

            const rotateX = -y * rotateDegree;
            const rotateY = x * rotateDegree;
            const glowX = clientX - rect.left;
            const glowY = clientY - rect.top;

            cardEl.style.setProperty("--rx", `${rotateX}deg`);
            cardEl.style.setProperty("--ry", `${rotateY}deg`);
            cardEl.style.setProperty("--gx", `${glowX}px`);
            cardEl.style.setProperty("--gy", `${glowY}px`);

            rafId = null;
        });
    }

    function handleMouseEnter() {
        if (!cardEl) return;
        cardEl.style.setProperty("--glow-opacity", "1");
        cardEl.style.setProperty("--scale", `${hoverScale}`);
    }

    function handleMouseLeave() {
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        if (!cardEl) return;
        cardEl.style.setProperty("--rx", "0deg");
        cardEl.style.setProperty("--ry", "0deg");
        cardEl.style.setProperty("--scale", "1");
        cardEl.style.setProperty("--glow-opacity", "0");
    }
</script>

<div 
  class="perspective-container relative"
  style="width: {width}; height: {height}; {style}"
>
    <button
        aria-label="Photo Button"
        on:click={handle_click}
        bind:this={cardEl}
        class="card relative"
        class:secondary
        on:mousemove={handleMouseMove}
        on:mouseenter={handleMouseEnter}
        on:mouseleave={handleMouseLeave}
        style="--start-color: {startColor}; --stop-color: {stopColor};"
    >
        <!-- CARBON FIBER PATTERN & BACKGROUND IMAGE -->
        <div class="carbon-texture absolute inset-0 z-0"></div>
        {#if thumbnail}
            <img class="absolute inset-0 z-10 h-full w-full object-cover mix-blend-luminosity opacity-90" src={thumbnail} alt={title}> 
        {/if}

        <!-- TECHNICAL GRID OVERLAY -->
        <!-- <div class="tech-grid absolute inset-0 z-15 pointer-events-none"></div> -->

        <!-- CORNER BRACKETS (UNT GREEN ACCENT) -->
        <!-- <div class="corner-bracket top-left z-30"></div>
        <div class="corner-bracket bottom-right z-30"></div> -->

        <!-- DARK GRADIENT OVERLAY FOR READABILITY -->
        <div class="absolute inset-0 z-20" style="background-image: linear-gradient(to top, rgba(5, 12, 8, 0.95) 0%, rgba(5, 12, 8, 0.4) 50%, rgba(5, 12, 8, 0.1) 100%);"></div>

        <div class="card-body z-30 flex flex-col justify-end text-left">
            <slot>
                {#if subtitle}
                    <p class="font-mono text-xs uppercase tracking-wider text-[#00853E] mb-1 font-bold z-30">{subtitle}</p>
                {/if}
                <h2 class="font-[Bronzier] text-3xl italic uppercase leading-none text-white drop-shadow-md z-30">{title}</h2>
            </slot>

            <!-- SPOTLIGHT / HEADLIGHT GLOW -->
            <div class="glow z-40"></div>
        </div>
    </button>
</div>

<style>
  /* @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,700;1,700;1,900&family=JetBrains+Mono:wght@500;700&display=swap'); */

  .perspective-container {
    perspective: 1000px;
    display: inline-block;
    box-sizing: border-box;
    /* font-family: 'Chakra Petch', sans-serif; */
  }

  .card {
    /* CSS Variable Defaults */
    --rx: 0deg;
    --ry: 0deg;
    --scale: 1;
    --gx: 50%;
    --gy: 50%;
    --glow-opacity: 0;

    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #051a0c;
    color: #ffffff;
    padding: 1.5rem;
    
    /* AGGRESSIVE INDUSTRIAL CHAMFERED CORNERS */
    clip-path: polygon(
      0 0, 
      calc(100% - 16px) 0, 
      100% 16px, 
      100% 100%, 
      16px 100%, 
      0 calc(100% - 16px)
    );

    border: 1px solid rgba(0, 133, 62, 0.3);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    
    /* Smooth transform curve for entry, tracking, scale & exit */
    transform: rotateX(var(--rx)) rotateY(var(--ry)) scale3d(var(--scale), var(--scale), var(--scale));
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease;
    will-change: transform;
    transform-style: preserve-3d;
    
    overflow: hidden;
    cursor: pointer;
    user-select: none;
  }

  .card:hover {
    border-color: #00853E; /* UNT Green Border Accent */
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 133, 62, 0.4);
  }

  .card.secondary {
    background-color: #111a14;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* CARBON FIBER WEAVE PATTERN */
  .carbon-texture {
    background: 
      linear-gradient(27deg, #0a180e 5px, transparent 5px) 0 5px,
      linear-gradient(207deg, #0a180e 5px, transparent 5px) 10px 0,
      linear-gradient(27deg, #122417 5px, transparent 5px) 0 10px,
      linear-gradient(207deg, #122417 5px, transparent 5px) 10px 5px;
    background-color: #051409;
    background-size: 20px 20px;
    opacity: 0.7;
  }

  /* CHASSIS GRID LINES */
  /* .tech-grid {
    background-image: linear-gradient(rgba(0, 133, 62, 0.08) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 133, 62, 0.08) 1px, transparent 1px);
    background-size: 16px 16px;
  } */

  /* INDUSTRIAL CORNER BRACKETS (UNT GREEN) */
  /* .corner-bracket {
    position: absolute;
    width: 8px;
    height: 8px;
    border-color: #00853E;
    pointer-events: none;
  } */
  /* .top-left {
    top: 6px;
    left: 6px;
    border-top: 2px solid #00853E;
    border-left: 2px solid #00853E;
  }
  .bottom-right {
    bottom: 6px;
    right: 6px;
    border-bottom: 2px solid #00853E;
    border-right: 2px solid #00853E;
  } */

  .card-body {
    position: relative;
    height: 100%;
  }

  .glow {
    position: absolute;
    inset: -1.5rem;
    pointer-events: none;
    opacity: var(--glow-opacity);
    background-image: radial-gradient(
      circle at var(--gx) var(--gy),
      var(--start-color),
      var(--stop-color) 60%
    );
    will-change: opacity, background-image;
    transition: opacity 0.3s ease;
  }
</style>