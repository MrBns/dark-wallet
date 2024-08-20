<script lang="ts">
	import iconify from '$lib/helpers/iconify';
	import Modal from '../modal/Modal.svelte';
	import Drawer from './Drawer.svelte';

	let drawer = $state<Drawer>();

	export const show = (zIndex?: number) => drawer?.show(zIndex);
	export const hide = () => drawer?.hide();

	const linksShortCut = [
		{
			icon: iconify.addMoney,
			name: 'Deposit',
			link: '/trx/add?type=deposit',
			classNames: 'bg-green-100 text-green-700 font-medium'
		},
		{
			icon: iconify.withdrawMoney,
			name: 'Withdraw',
			link: '/trx/add?type=withdraw',
			classNames: 'bg-red-100 text-red-700 font-medium'
		}
	];
</script>

<Drawer bind:this={drawer} direction="bottom" title="Shortcuts">
	<div class="p-4 flex gap-2 flex-wrap w-screen md:w-[600px] lg:w-[800px]">
		{#each linksShortCut as l, _idx}
			<a
				onclick={() => drawer?.hide()}
				href={l.link}
				class="inline-block px-4 py-2 border rounded-md grow shrink-0 w-1/4 {l.classNames}"
			>
				<iconify-icon class="text-[1.5em] align-middle mr-1" icon={l.icon}></iconify-icon>
				<span class=""> {l.name}</span>
			</a>
		{/each}
	</div>
</Drawer>
