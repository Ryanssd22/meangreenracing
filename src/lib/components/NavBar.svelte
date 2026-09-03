<!-- Root Layout Nav Bar -->
<script>
	/*
  Menu:
    Home
    About
    Members
    Senior Spotlight
    Contact
  */
	//BITS-UI Components
	import { DropdownMenu } from 'bits-ui';

	//ICONS
	import MdiInstagram from '~icons/mdi/instagram';
	import MdiFacebook from '~icons/mdi/facebook';
	import RiArrowDownSLine from '~icons/ri/arrow-down-s-line';
	import IcBaselineDiscord from '~icons/ic/baseline-discord';
	import MdiLinkedin from '~icons/mdi/linkedin';

	import unt_logo from '$lib/assets/unt_logo.png';
	import { page } from '$app/state';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { fly } from 'svelte/transition';
	let pathname = $derived(page.url.pathname);

	// Links
	const main_links = [
		{
			"name": "Home",
			"href": "/",
		},
		{
			"name": "About",
			"href": "/",
			"type": "menu",
			"menu": [

			]
		},
		{
			"name": "Members",
			"href": "/members",
		},
		{
			"name": "Media",
			"href": "/media",
		},
		{
			"name": "Sponsors",
			"href": "/sponsors",
		},
	]
	const icon_links = [
		{
			"icon": MdiInstagram,
			"href": "https://www.instagram.com/meangreenracing/?hl=en",
		},
		{
			"icon": MdiFacebook,
			"href": "https://www.facebook.com/UNTMeanGreenRacing/",
		},
		{
			"icon": IcBaselineDiscord,
			"href": "https://discord.gg/2PckGJCbmp",
		},
		{
			"icon": MdiLinkedin,
			"href": "https://www.linkedin.com/company/fsae-unt-mean-green-racing/",
		},
	]

	let scrollY = $state(0);
	let altNavbar = $derived.by(() => {
		if (pathname == '/') {
			if (scrollY < 200) {
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	});

	let navigating = $state(false);
	beforeNavigate(() => {
		navigating = true;
	});
	afterNavigate(() => {
		navigating = false;
	});

	//Handles open menu
	let menuOpen = $state(false);

	// Hamburger logic
	let hamburger_open = $state(false);
	import { innerWidth } from 'svelte/reactivity/window';
	import '$lib/hamburgers.css'
</script>

<!-- SCROLL TRACKING -->
<svelte:window bind:scrollY />

<!-- MAIN NAVBAR DISPLAY -->
<div
	class="fixed z-50 flex h-20 w-full flex-row items-center justify-between border-b-1 border-b-white/30 py-2 text-white shadow-xl
  backdrop-blur-xs transition-colors"
	class:duration-250={!navigating}
	class:duration-0={navigating}
	class:bg-black={altNavbar}
>
	<!-- LEFT ALIGNED NAVIGATION-->
	<div class="mx-8 flex h-full flex-row items-center gap-8">
		<!-- MEAN GREEN RACING LOGO -->
		<img src={unt_logo} alt="UNT Logo" class="h-full object-contain" />

		<!-- NAVIGATION LINKS -->
		<div class="gap-4 font-[Bronzier] text-xl italic hidden md:flex" >
			<a class="group nav_link" class:text-green-300={pathname == "/"} href="/">
				HOME
				<span class="-mt-1 block h-[1px] max-w-0 bg-green-600 transition-all group-hover:max-w-full" class:max-w-full={pathname == "/"}
				></span>
			</a>

			<!-- <button onclick={openMenu} class="flex cursor-pointer items-center"> -->
			<!-- 	ABOUT -->
			<!-- 	<RiArrowDownSLine /> -->
			<!-- </button> -->
			<DropdownMenu.Root bind:open={menuOpen}>
				<DropdownMenu.Trigger
					class="group flex cursor-pointer items-center transition-all hover:text-green-300 {menuOpen ? 'text-green-300' : ''}"
				>
					<p>
            ABOUT
            <span class="-mt-1 block h-[1px] max-w-0 bg-green-600 transition-all group-hover:max-w-full"
            ></span>
          </p>
					<div class:rotate-90={menuOpen} class="transition-all">
						<RiArrowDownSLine />
					</div>
				</DropdownMenu.Trigger>

				<DropdownMenu.Portal>
					<DropdownMenu.Content
						class="relative z-60 rounded-xl bg-green-700 px-4 py-2 shadow-xl"
						sideOffset={1}
						forceMount
					>
						{#snippet child({ wrapperProps, props, open })}
							{#if open}
								<div {...wrapperProps} class="font-[Bronzier] text-xl text-white">
									<div {...props} transition:fly={{ y: -5 }}>
										<DropdownMenu.Item>
											<a href="/history" class="transition-all duration-100 hover:text-green-300"
												>History</a
											>
										</DropdownMenu.Item>
										<DropdownMenu.Item>
											<a href="/cars" class="transition-all duration-100 hover:text-green-300"
												>Cars</a
											>
										</DropdownMenu.Item>
										<DropdownMenu.Item>
											<a href="/spotlight" class="transition-all duration-100 hover:text-green-300"
												>Senior Spotlight</a
											>
										</DropdownMenu.Item>
										<DropdownMenu.Item>
											<a href="/designs" class="transition-all duration-100 hover:text-green-300"
												>Senior Designs</a
											>
										</DropdownMenu.Item>
									</div>
								</div>
							{/if}
						{/snippet}
						<!-- <DropdownMenu.Item -->
						<!--   class="font-[Bronzier] text-white text-xl"  -->
						<!-- > -->
						<!--   <p>TEST</p> -->
						<!-- </DropdownMenu.Item> -->
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>

			<a href="/members" class="nav_link group" class:text-green-300={pathname == "/members"}>
        MEMBERS
        <span class="-mt-1 block h-[1px] max-w-0 bg-green-600 transition-all group-hover:max-w-full" class:max-w-full={pathname == "/members"}
				></span>
      </a>
	  <a href="/media" class="group nav_link" class:text-green-300={pathname.includes("/media")}>
        MEDIA
        <span class="-mt-1 block h-[1px] max-w-0 bg-green-600 transition-all group-hover:max-w-full" class:max-w-full={pathname.includes("/media")}
				></span>
      </a>
			<a href="/sponsors" class="group nav_link" class:text-green-300={pathname == "/sponsors"}>
        SPONSORS
        <span class="-mt-1 block h-[1px] max-w-0 bg-green-600 transition-all group-hover:max-w-full" class:max-w-full={pathname == "/sponsors"}
				></span>
      </a>
		</div>
	</div>

	<!-- RIGHT ALIGNED SOCIALS -->
	<div class="mr-4 md:flex flex-row items-center gap-2 hidden">
		{#each icon_links as {href, icon: Icon}}
			<a class="nav_link" href={href} target="_blank">
				<Icon class="size-6"/>
			</a>
		{/each}
	</div>

	<!-- HAMBURGER -->
	<div class="md:hidden flex mx-5 z-100">
		<!-- <button onclick={() => {hamburger_open = true}}>
			<MenuHamburgerIcon class="white size-8 hover:cursor-pointer" />
		</button> -->
		<button class="hamburger hamburger--spin size-15 z-100" class:is-active={hamburger_open} onclick={() => {hamburger_open = true}} type="button">
		<span class="hamburger-box">
			<span class="hamburger-inner"></span>
		</span>
		</button>  
	</div>
</div>

<!-- MOBILE NAVBAR DISPLAY -->
{#if hamburger_open}
<div in:fly={{opacity:100, x:innerWidth.current}} class="bg-blue-500 w-screen h-screen fixed inset-0 z-90">
</div>
{/if}

<style>
	@reference "../../app.css";
	/* a:hover { */
	/* 	color: oklch(62.7% 0.194 149.214); */
	/* 	transition: color 0.1s ease-in-out; */
	/* } */
	.nav_link {
		@apply transition-all duration-100 hover:text-green-300 active:text-green-500 active:scale-99;
	}
</style>
