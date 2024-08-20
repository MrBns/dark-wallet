<script lang="ts">
	import fmtCurrency from '$lib/helpers/fmtCurrency';
	import iconify from '$lib/helpers/iconify';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let {
		data: v,
		...props
	}: {
		data: {
			note: string;
			amount: {
				official: number;
				unOfficial: number;
			};
		};
		onViewDetailsClick?: HTMLButtonAttributes['onclick'];
	} = $props();
</script>

<div class="space-y-2 table-cell-short-element-details-card">
	<div class="text-center leading-tight flex items-center gap-x-2">
		<iconify-icon icon={iconify.noteBookFilled} class="text-xl/none text-gray-500"></iconify-icon>
		<p class="line-clamp-1">{v.note}</p>
	</div>
	<div class="flex items-center gap-2">
		<div class="text-[0px] md:hidden">
			<button
				onclick={props.onViewDetailsClick}
				class="p-0.5 border rounded text-stone-700 active:bg-primary-300 border-dark-300"
				><iconify-icon icon={iconify.viewDetails} class="text-2xl"></iconify-icon></button
			>
		</div>
		<div
			class="text-center flex-1 border p-0.5 px-1.5 rounded leading-tight flex text-slate-500 gap-2 items-center text-lg/none"
		>
			<iconify-icon icon={iconify.officialMoney}></iconify-icon>
			<p class=" font-oswald font-bold">
				{fmtCurrency(v.amount.official, 'short')}
			</p>
		</div>

		<div
			class="text-center flex-1 border p-0.5 px-1.5 rounded leading-tight flex text-stone-500 gap-2 items-center text-lg/none"
		>
			<iconify-icon icon={iconify.unofficialMoney} class="text-[1.3em]"></iconify-icon>
			<p class=" font-oswald font-bold">
				{fmtCurrency(v.amount.unOfficial, 'short')}
			</p>
		</div>
	</div>
</div>
