<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PrimaryButton from '$lib/components/button/PrimaryButton.svelte';
	import SearchParams from '$lib/helpers/URLSearchParams.svelte';
	import AllTrxTable from '~pages/PageTransaction/AllTrxTable.svelte';
	import DepositTrxTable from '~pages/PageTransaction/DepositTrxTable.svelte';
	import WithdrawTrxTable from '~pages/PageTransaction/WithdrawTrxTable.svelte';

	const urlParams = new SearchParams();
	const trxType = $derived.by(() => urlParams.get('type') || 'deposit') as
		| 'deposit'
		| 'withdraw'
		| 'all';
	console.log(urlParams.get('type'));
</script>

<main class="">
	<div class="bg-white">
		<div class="flex container justify-between py-5">
			<div class="flex gap-x-6">
				<h1 class="lg:text-3xl font-medium">
					<span class="capitalize">{urlParams.get('type') || 'deposit'}</span> Transaction
				</h1>
				<div class="">
					<select
						onchange={(e) => urlParams.setAndChangeUrl('type', e.currentTarget.value)}
						class="px-4 rounded-md border border-gray-300 h-full focus:outline-none focus:border-sky-400 bg-white"
					>
						<option selected={trxType === 'all'} value="all">All</option>
						<option selected={trxType === 'deposit'} value="deposit">Deposit</option>
						<option selected={trxType === 'withdraw'} value="withdraw">Withdraw</option>
					</select>
				</div>
			</div>

			<div class="hidden lg:block">
				<PrimaryButton onclick={() => goto('trx/add?type=deposit')}>Deposit</PrimaryButton>
				<PrimaryButton onclick={() => goto('trx/add?type=withdraw')}>Withdraw</PrimaryButton>
			</div>
		</div>
	</div>

	<div class="max-w-screen overflow-auto min-h-[calc(100vh_-_120px)]">
		{#if trxType === 'deposit'}
			<DepositTrxTable />
		{:else if trxType === 'withdraw'}
			<WithdrawTrxTable />
		{:else}
			<AllTrxTable />
		{/if}
	</div>
</main>
