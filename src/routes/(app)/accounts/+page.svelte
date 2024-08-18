<script lang="ts">
	import PrimaryButton from '$lib/components/button/PrimaryButton.svelte';
	import {
		accounts,
		totalOfficialAmount,
		totalUnofficialAmount
	} from '$module/accounts/account.svelte';
	import AddAccountModal from '$lib/components/modal/AddAccountModal.svelte';

	import fmtCurrency from '$lib/helpers/fmtCurrency';
	import AccountCard from '$lib/components/cards/AccountCard.svelte';

	let modal = $state<AddAccountModal>();
</script>

<AddAccountModal bind:this={modal} />
{#snippet totalAmountCard(name: string, amount: number)}
	<div class="p-3 flex-1 text-center">
		<p class="text-gray-600 text-sm lg:text-base">{name}</p>
		<p
			class="font-oswald text-4xl font-bold lg:text-5xl text-slate-700 tracking-wide lg:font-medium"
		>
			{fmtCurrency(amount)}
		</p>
	</div>
{/snippet}

<main class="">
	<div class="bg-white m-2 mx-4 rounded-3xl lg:m-0 lg:rounded-none">
		<div
			class="flex flex-col lg:flex-row container gap-x-5 py-4 divide-y-2 lg:divide-y-0 lg:divide-x"
		>
			{@render totalAmountCard('Total - with unofficial', totalUnofficialAmount.value)}
			{@render totalAmountCard('Total - only Official', totalOfficialAmount.value)}
			{@render totalAmountCard(
				'Total - only unofficial',
				totalUnofficialAmount.value - totalOfficialAmount.value
			)}
		</div>
	</div>
	<div class="container pt-10 pb-20">
		<div class="">
			<div class="flex mb-2">
				<h1 class="text-2xl flex-1">All Accounts</h1>
				<PrimaryButton onclick={() => modal?.show()}>Add Account</PrimaryButton>
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{#each accounts.value as acc}
					<AccountCard account={acc} />
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
