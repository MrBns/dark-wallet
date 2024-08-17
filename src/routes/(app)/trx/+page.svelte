<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PrimaryButton from '$lib/components/button/PrimaryButton.svelte';
	import { onMount } from 'svelte';
	import * as trxServices from '$module/transaction/transaction.services';
	import { depositTrxStore } from '$module/transaction/transaction.svelte';
	import fmtCurrency from '$lib/helpers/fmtCurrency';
	import DepositTrxTable from '../../../pages/PageTransaction/DepositTrxTable.svelte';
	import WithdrawTrxTable from '../../../pages/PageTransaction/WithdrawTrxTable.svelte';
	import AllTrxTable from '../../../pages/PageTransaction/AllTrxTable.svelte';

	const urlParams = $derived($page.url.searchParams);
	let trxType = $state<'deposit' | 'withdraw' | 'all'>('deposit');

	$effect(() => {
		if (urlParams.get('type') === 'withdraw') {
			trxType = 'withdraw';
		} else if (urlParams.get('type') === 'all') {
			trxType = 'all';
		} else {
			trxType = 'deposit';
		}
	});
</script>

<main class="">
	<div class="container">
		<div class="flex justify-between py-5 border-b-black/20 border-b">
			<h1 class="text-3xl font-medium">
				<span class="capitalize">{urlParams.get('type') || 'deposit'}</span> Transaction
			</h1>
			<div class="">
				<PrimaryButton onclick={() => goto('trx/add?type="deposit')}>Deposit</PrimaryButton>
				<PrimaryButton onclick={() => goto('trx/add?type="withdraw"')}>Withdraw</PrimaryButton>
			</div>
		</div>
	</div>

	{#if trxType === 'deposit'}
		<DepositTrxTable />
	{:else if trxType === 'withdraw'}
		<WithdrawTrxTable />
	{:else}
		<AllTrxTable />
	{/if}
</main>

<style lang="postcss">
	/* table.transaction-table */
	table.transaction-table thead tr th {
		@apply bg-white border border-black/60 p-3;
	}
	table.transaction-table thead tr.withdraw th {
		@apply border-pink-500 text-pink-700;
	}
	table.transaction-table thead tr th.description {
		@apply max-w-[10ch] border;
	}
</style>
