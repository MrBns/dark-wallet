<script lang="ts">
	import PrimaryButton from '$lib/components/button/PrimaryButton.svelte';
	import Input from '$lib/components/forms/input.svelte';
	import { safeEventHandler } from '$lib/helpers/asyncHandler';
	import { accounts } from '$module/accounts/account.svelte';
	import { createDepositTrx, createWithdrawTrx } from '$module/transaction/transaction.services';
	import { createTrxValidator } from '$module/transaction/transaction.validator';
	import type { HTMLFormAttributes, HTMLSelectAttributes } from 'svelte/elements';
	import { z, type ZodFormattedError } from 'zod';

	let formData = $state({
		type: '',
		note: '',
		account: '',
		amount: {
			official: 0,
			unOfficial: 0
		},
		description: ''
	});
	let error: ZodFormattedError<z.infer<typeof createTrxValidator>>;

	let selectedAccountBalance = $state({
		official: 0,
		unOfficial: 0
	});
	const handleAccountSelect: HTMLSelectAttributes['onselect'] = function (e) {
		const _selected = accounts.value.find((v) => v.documentId === e.currentTarget.value);
		selectedAccountBalance = {
			official: _selected?.amount.official || 0,
			unOfficial: _selected?.amount.unOfficial || 0
		};
	};

	const handleSubmit: HTMLFormAttributes['onsubmit'] = async function (e) {
		try {
			const result = await createTrxValidator.safeParseAsync(formData);

			if (result.success) {
				console.log(result.data);
				if (result.data.type === 'deposit') {
					await createDepositTrx(result.data);
				} else {
					await createWithdrawTrx(result.data);
				}
			} else {
				console.log(result.error.format());
			}
		} catch (e) {
			console.error(e);
		}
	};
</script>

<main class="">
	<div class="container">
		<div class="bg-white p-4 max-w-[1000px] mx-auto shadow">
			<div class="text-center">
				<h1 class="text-3xl">Create a Expense record</h1>
			</div>
			<form onsubmit={handleSubmit} action="" class="space-y-8">
				<div class="flex gap-x-4">
					<label for="deposit" class="">
						<span>Deposit</span>
						<input
							bind:group={formData.type}
							id="deposit"
							type="radio"
							name="type"
							value="deposit"
						/>
					</label>
					<label for="withdraw" class="">
						<span>Withdraw</span>
						<input
							bind:group={formData.type}
							id="withdraw"
							type="radio"
							name="type"
							value="withdraw"
						/>
					</label>
				</div>

				<div class="">
					<label for="note">Note</label>
					<Input bind:value={formData.note} placeholder="expense reason" />
				</div>
				<div class="flex gap-x-8">
					<div class="w-6/12">
						<label for="account" class="">Select Account</label>

						<select
							onchange={handleAccountSelect}
							name=""
							class="bg-white border border-gray-300 p-2 w-full rounded"
							id="account"
							bind:value={formData.account}
						>
							<option value="">None</option>
							{#each accounts.value as acc}
								<option value={acc.documentId}>{acc.name}</option>
							{/each}
						</select>
					</div>
					<div class="w-6/12">
						<p>Available Balance</p>
						<div class="flex">
							<div class="flex-1">
								<p class="text-xs">official</p>
								<p class="text-3xl font-bold">{selectedAccountBalance.official}</p>
							</div>
							<div class="flex-1">
								<p class="text-xs">unofficial</p>
								<p class="text-3xl font-bold">{selectedAccountBalance.unOfficial}</p>
							</div>
						</div>
					</div>
				</div>

				<div class="">
					<h3 class="text-xl mb-2">Amount</h3>
					<div class="flex pl-4 border-l gap-x-4">
						<div class="flex-1">
							<label for="official_amount">Official</label>
							<Input
								bind:value={formData.amount.official}
								name="official_amount"
								type="number"
								placeholder="Amount that parents knows"
							/>
						</div>
						<div class="flex-1">
							<label for="unOfficial_amount">unOfficial</label>
							<Input
								bind:value={formData.amount.unOfficial}
								type="number"
								id="unOfficial_amount"
								placeholder="Parents don't knows"
							/>
						</div>
					</div>
				</div>

				<div class="">
					<label for="description">Write Some Description</label>
					<textarea
						bind:value={formData.description}
						name="description"
						id="description"
						class="bg-white resize-y border border-gray-300 p-2 w-full rounded"
						rows="5"
					></textarea>
				</div>

				<div class="">
					<PrimaryButton>Add Transaction</PrimaryButton>
				</div>
			</form>
		</div>
	</div>
</main>

<style lang="postcss">
</style>
