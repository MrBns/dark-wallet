<script>
	import MobileTrxDetailsCard from '$lib/components/cards/MobileTrxDetailsCard.svelte';
	import fmtCurrency from '$lib/helpers/fmtCurrency';
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
		<table class="w-full transaction-table deposit">
			<thead>
				<tr class="">
					<th class="date">Date</th>
					<th class="note">Note</th>
					<th class="description hidden 2xl:table-cell">Description</th>
					<th class="official hidden ml:table-cell">Official</th>
					<th class="unofficial hidden ml:table-cell">Unofficial</th>
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
						<td class="description hidden 2xl:table-cell">{v.description}</td>

						<td class="official hidden ml:table-cell">{fmtCurrency(v.amount.official, 'short')}</td>
						<td class="unofficial hidden ml:table-cell"
							>{fmtCurrency(v.amount.unOfficial, 'short')}</td
						>
						<td class="action hidden md:table-cell">
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
