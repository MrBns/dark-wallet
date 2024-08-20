<script lang="ts">
	import iconify from '$lib/helpers/iconify';
	import NavbarMoreToolsBottomDrawer from '../drawer/NavbarMoreToolsBottomDrawer.svelte';
	let navbarMoreToolsDrawer = $state<NavbarMoreToolsBottomDrawer>();
</script>

{#snippet navLink(text?: string, link?: string)}
	<li class="">
		<a
			href={link}
			class=" px-3 lg:px-6 py-2 lg:py-3 text-xs lg:text-base inline-block text-gray-700 font-normal uppercase hover:bg-gray-200 rounded"
			>{text}</a
		>
	</li>
{/snippet}

<nav class="bg-white fixed bottom-0 w-full py-2">
	<div class="container relative">
		<div class="w-fit absolute right-3 xl:right-0 -top-2/3 sm:-top-1/3">
			<button
				onclick={() => navbarMoreToolsDrawer?.show()}
				class="p-3 border border-current bg-white text-dark-500 inline-flex rounded-full"
			>
				<iconify-icon class="text-2xl md:text-xl" icon={iconify.moreApps}></iconify-icon>
			</button>
		</div>

		<ul class="flex justify-center">
			{@render navLink('Home', '/')}
			{@render navLink('Transaction', '/trx?type=deposit')}
			{@render navLink('Accounts', '/accounts')}
		</ul>
	</div>
</nav>

<NavbarMoreToolsBottomDrawer bind:this={navbarMoreToolsDrawer} />

<style lang="postcss">
	nav {
		box-shadow: 0px -7px 10px 0px rgba(0, 0, 0, 0.037);
	}
</style>
