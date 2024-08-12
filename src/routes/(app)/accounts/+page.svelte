<script lang="ts">
	import PrimaryButton from '$lib/components/button/PrimaryButton.svelte';
	import {
		accounts,
		totalOfficialAmount,
		totalUnofficialAmount
	} from '$module/accounts/account.svelte';
	import AddAccountModal from '$lib/components/modal/AddAccountModal.svelte';

	let modal = $state<AddAccountModal>();
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
					Total unofficial Amount <span class="text-5xl">{totalOfficialAmount.value}</span>
				</p>
				<p class="p-3 bg-red-500 flex-1 text-white text-xl rounded">
					Total unofficial Amount <span class="text-5xl">{totalUnofficialAmount.value}</span>
				</p>
				<p class="p-3 bg-orange-500 flex-1 text-white text-xl rounded">
					Total unofficial Extra Amount <span class="text-5xl"
						>{totalUnofficialAmount.value - totalOfficialAmount.value}</span
					>
				</p>
			</div>
			{#each accounts.value as acc}
				<div class="bg-indigo-400 text-white mb-2 p-4 rounded-2xl">
					<p class="text-2xl">Name - {acc.name}</p>
					<p>UnOfficial Amount - {acc.amount.unOfficial}</p>
					<p>Official Amount - {acc.amount.official}</p>
					<p class="">Unofficial Extra - {acc.amount.unOfficial - acc.amount.official}</p>
				</div>
			{/each}
		</div>
	</div>
</main>

<style lang="postcss">
</style>
