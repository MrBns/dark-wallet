<script lang="ts">
	import PrimaryButton from '$lib/components/button/PrimaryButton.svelte';
	import DashboardBlock from '$lib/components/mixed/DashboardBlock.svelte';
	import fmtCurrency from '$lib/helpers/fmtCurrency';
	import { totalOfficialAmount, totalUnofficialAmount } from '$module/accounts/account.svelte';
</script>

{#snippet balanceCard(balance: number, name: string, className: string)}
	<div class="py-3 rounded-md px-4 {className}">
		<p class="mb-1">{name}</p>
		<p class="text-3xl font-medium font-oswald tracking-wide">{fmtCurrency(balance)}</p>
	</div>
{/snippet}

<DashboardBlock title="total Balance">
	<div class="space-y-3">
		<div class="space-y-2">
			{@render balanceCard(totalOfficialAmount.value, 'Official Amount', 'bg-sky-100 text-sky-900')}
			{@render balanceCard(
				totalUnofficialAmount.value,
				'UnOfficial Amount',
				'bg-indigo-100 text-indigo-900'
			)}
			{@render balanceCard(
				totalUnofficialAmount.value - totalOfficialAmount.value,
				'UnOfficial Extra Amount',
				'bg-purple-100 text-purple-900'
			)}
		</div>
		<div class="text-center">
			<PrimaryButton>Hide Balance</PrimaryButton>
		</div>
	</div>
</DashboardBlock>

<style lang="postcss">
</style>
