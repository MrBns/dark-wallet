<script lang="ts">
	import Confirm from '$lib/helpers/confirm';
	import fmtCurrency from '$lib/helpers/fmtCurrency';
	import iconify from '$lib/helpers/iconify';
	import type { AccountI } from '$module/accounts/account.interface';
	import { deleteSingleAccount } from '$module/accounts/account.services';

	let {
		account: acc,
		...props
	}: {
		account: AccountI;
	} = $props();

	function handleAccountDelete(account: AccountI) {
		Confirm({
			html: `
			<div class="text-xl text-red-500">
				<p class=""> Are you Sure you want to Delete</p>
				<p class="font-bold"> ${account.name} </p>	
			<div/>`
		}).then((v) => {
			console.log({ v });
			if (v) {
				deleteSingleAccount(account.documentId);
			}
		});
	}
</script>

{#snippet accountBalanceShower(type: string, number: number, parentClass = '', amountClass = '')}
	<div class="grow bg-opacity-35 items-center leading-snug shrink-0 flex {parentClass}">
		<p class="text-[13px] lg:text-base w-[200px]">{@html type}</p>
		<p class="font-montserrat lg:font-oswald font-semibold tracking-wide lg:text-2xl {amountClass}">
			{fmtCurrency(number)}
		</p>
	</div>
{/snippet}

<div
	class="bg-white text-gray-600 border border-gray-300 px-4 py-2 lg:p-4 rounded-md lg:rounded-2xl isolate relative group"
>
	<img
		src={acc.logo}
		alt=""
		class="max-h-full absolute right-0 top-0 -z-10 opacity-[0.07] lg:opacity-15"
	/>
	<h3 class="text-xl font-montserrat mb-2 lg:text-2xl text-gray-800 font-semibold lg:font-medium">
		{acc.name}
	</h3>
	<div class="flex flex-wrap flex-col">
		{@render accountBalanceShower(
			'Total - with Unofficial',
			acc.amount.unOfficial,
			'text-blue-900'
		)}
		{@render accountBalanceShower('Only Official ', acc.amount.official, 'text-yellow-700')}
		{@render accountBalanceShower(
			'Only Unofficial',
			acc.amount.unOfficial - acc.amount.official,
			'text-red-800'
		)}
	</div>

	<button
		onclick={() => handleAccountDelete(acc)}
		class="text-3xl absolute top-3 right-3 hover:text-red-600 group-hover:visible invisible"
	>
		<iconify-icon icon={iconify.trashDuo}></iconify-icon>
	</button>
</div>

<style lang="postcss">
</style>
