<script lang="ts">
	import PrimaryButton from '$lib/components/button/PrimaryButton.svelte';
	import {
		accounts,
		totalOfficialAmount,
		totalUnofficialAmount
	} from '$module/accounts/account.svelte';
	import AddAccountModal from '$lib/components/modal/AddAccountModal.svelte';
	import iconify from '$lib/helpers/iconify';
	import Confirm from '$lib/helpers/confirm';

	import type { AccountI } from '$module/accounts/account.interface';
	import { deleteSingleAccount } from '$module/accounts/account.services';
	import { onMount } from 'svelte';

	let modal = $state<AddAccountModal>();
	let colors = $state<string[]>([]);
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

	// onMount(async () => {
	// 	const _colors = await import('$lib/helpers/getColorShades');
	// 	colors = _colors.default();
	// });
</script>

<AddAccountModal bind:this={modal} />
<main class="">
	<div class="container pt-10 pb-20">
		<div class="flex mb-10">
			<h1 class="text-5xl flex-1">All Accounts</h1>
			<PrimaryButton onclick={() => modal?.show()}>Add Account</PrimaryButton>
		</div>
		<div class="">
			<div class="flex gap-x-5 mb-5">
				<p class="p-3 bg-green-500 flex-1 text-white text-xl rounded">
					Total unofficial Amount <span class="text-5xl">{totalUnofficialAmount.value}</span>
				</p>
				<p class="p-3 bg-red-500 flex-1 text-white text-xl rounded">
					Total unofficial Amount <span class="text-5xl">{totalOfficialAmount.value}</span>
				</p>
				<p class="p-3 bg-orange-500 flex-1 text-white text-xl rounded">
					Total unofficial Extra Amount <span class="text-5xl"
						>{totalUnofficialAmount.value - totalOfficialAmount.value}</span
					>
				</p>
			</div>
			<div class="grid grid-cols-3 gap-4">
				{#each accounts.value as acc}
					{console.log(acc)}
					<div class="bg-white text-gray-600 border border-gray-300 p-4 rounded-2xl relative group">
						<p class="text-2xl font-medium">{acc.name}</p>
						<p>
							Total (with Unofficial) - <span class="font-oswald text-xl"
								>{acc.amount.unOfficial}</span
							>
						</p>
						<p>Official - <span class="font-oswald text-xl">{acc.amount.official}</span></p>
						<p class="">
							Unofficial - <span class="font-oswald text-xl"
								>{acc.amount.unOfficial - acc.amount.official}</span
							>
						</p>
						<button
							onclick={() => handleAccountDelete(acc)}
							class="text-3xl absolute top-3 right-3 hover:text-red-600 group-hover:visible invisible"
						>
							<iconify-icon icon={iconify.trashDuo}></iconify-icon>
						</button>
					</div>
				{/each}
			</div>
		</div>
	</div>
</main>

<!-- <div class="">
	{#each colors as color}
		<div class="w-10 h-5" style="background: {color}"></div>
	{/each}
</div> -->

<style lang="postcss">
</style>
