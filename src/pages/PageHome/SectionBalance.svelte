<script lang="ts">
	import PrimaryButton from '$lib/components/button/PrimaryButton.svelte';
	import DashboardBlock from '$lib/components/mixed/DashboardBlock.svelte';
	import fmtCurrency from '$lib/helpers/fmtCurrency';
	import { totalOfficialAmount, totalUnofficialAmount } from '$module/accounts/account.svelte';
</script>

{#snippet balanceCard(balance: number, name: string, className: string)}
	<div class="py-1 lg:py-3 rounded-md px-4 grow shrink-0 w-[40%] lg:w-full {className}">
		<p class="text-xs md:text-sm lg:text-base lg:mb-1">{name}</p>
		<p class="lg:text-3xl font-medium font-oswald text-xl tracking-wide">{fmtCurrency(balance)}</p>
	</div>
{/snippet}

<DashboardBlock title="total Balance">
	<div class="space-y-3">
		<div class="lg:space-y-2 flex lg:block flex-wrap gap-2">
			{@render balanceCard(
				totalUnofficialAmount.value,
				'UnOfficial Amount',
				'bg-indigo-100 text-indigo-900 !w-full'
			)}
			{@render balanceCard(totalOfficialAmount.value, 'Official Amount', 'bg-sky-100 text-sky-900')}
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
