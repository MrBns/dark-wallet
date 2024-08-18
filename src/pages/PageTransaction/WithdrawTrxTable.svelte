<script>
	import fmtCurrency from '$lib/helpers/fmtCurrency';
	import { loadAllWithdrawTrx } from '$module/transaction/transaction.services';
	import { depositTrxStore, withdrawTrxStore } from '$module/transaction/transaction.svelte';
	import { onDestroy, onMount } from 'svelte';

	onMount(() => {
		loadAllWithdrawTrx();
	});
	onDestroy(() => {
		withdrawTrxStore.value = [];
	});
</script>

{#if withdrawTrxStore.value.length}
	<div class="min-[2000px]:container px-10 py-4">
		<table class="w-full transaction-table">
			<thead>
				<tr class="withdraw">
					<th class="date">Date</th>
					<th class="note">Note</th>
					<th class="description">Description</th>
					<th class="official-amount">Official Amount</th>
					<th class="unofficial-amount">Unofficial Amount</th>
					<th class="action">Action</th>
				</tr>
			</thead>
			<tbody>
				{#each withdrawTrxStore.value as value, idx}
					<tr class="">
						<td class="bg-white border-x p-2 border-y-8 border-y-gray-100"
							>{value.createdAt.toDate().toLocaleDateString('en-IN', {
								month: 'short',
								day: 'numeric',
								year: 'numeric'
							})}</td
						>
						<td class="bg-white border-x p-2 border-y-8 border-y-gray-100">{value.note}</td>
						<td class="bg-white border-x p-2 border-y-8 border-y-gray-100">{value.description}</td>
						<td class="bg-white border-x p-2 border-y-8 border-y-gray-100"
							>{fmtCurrency(value.amount.official)}</td
						>
						<td class="bg-white border-x p-2 border-y-8 border-y-gray-100"
							>{fmtCurrency(value.amount.unOfficial)}</td
						>
						<td class="bg-white border-x p-2 border-y-8 border-y-gray-100">
							{#if idx < 5}
								<button class="bg-yellow-500 text-white px-2 rounded">undo</button>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<div class="container py-8 text-center">
		<p class="font-oswald text-3xl text-gray-500">No Withdrawal Transaction Made yet.</p>
	</div>
{/if}
