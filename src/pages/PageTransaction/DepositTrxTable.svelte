<script>
	import MobileTrxDetailsCard from '$lib/components/cards/MobileTrxDetailsCard.svelte';
	import fmtCurrency from '$lib/helpers/fmtCurrency';
	import iconify from '$lib/helpers/iconify';
	import { loadAllDepositTrx } from '$module/transaction/transaction.services';

	import { depositTrxStore } from '$module/transaction/transaction.svelte';

	$effect(() => {
		loadAllDepositTrx();
		return () => {
			depositTrxStore.value = [];
		};
	});
</script>

{#if depositTrxStore.value.length}
	<div class="min-w-[450px] min-[2000px]:container px-2 lg:px-10 py-4">
		<table class="w-full transaction-table">
			<thead>
				<tr class="deposit">
					<th class="date">Date</th>
					<th class="note">Note</th>
					<th class="official hidden md:table-cell">Official</th>
					<th class="unofficial hidden md:table-cell">Unofficial</th>
					<th class="action max-md:hidden">Action</th>
				</tr>
			</thead>
			<tbody>
				{#each depositTrxStore.value as v, idx}
					<tr class="">
						<td class="date"
							>{v.createdAt.toDate().toLocaleDateString('en-IN', {
								month: 'short',
								day: 'numeric',
								year: 'numeric'
							})}</td
						>
						<td class="note">
							<div class="hidden ml:block">
								{v.note}
							</div>
							<div class="ml:hidden">
								<MobileTrxDetailsCard data={v} />
							</div>
						</td>

						<td class="official hidden ml:table-cell">{fmtCurrency(v.amount.official, 'short')}</td>
						<td class="unofficial hidden ml:table-cell"
							>{fmtCurrency(v.amount.unOfficial, 'short')}</td
						>
						<td class="action max-md:hidden">
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
		<p class="font-oswald text-3xl text-gray-500">No Deposit Transaction Made yet.</p>
	</div>
{/if}

<style lang="postcss">
	/* table.transaction-table */
	table.transaction-table thead tr th {
		@apply bg-white border border-black/60 p-1 lg:p-3;
	}
	table.transaction-table thead tr.deposit th {
		@apply border-green-500 text-green-700;
	}
	table.transaction-table thead tr th.description {
		@apply max-w-[10ch] border;
	}
	table tbody td {
		@apply bg-white border-x p-2 ml:px-3 border-y-8 border-y-gray-100;
	}
	th.date,
	td.date {
		@apply w-[12ch];
	}
	th.note,
	td.note {
		@apply max-w-[165px];
	}
	th.action,
	td.action {
		@apply w-[80px];
	}

	td.official,
	th.official,
	td.unofficial,
	th.unofficial {
		@apply w-[100px] lg:w-[150px];
	}
</style>
