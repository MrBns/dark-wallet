<script lang="ts">
	import PrimaryButton from '$lib/components/button/PrimaryButton.svelte';
	import Input from '$lib/components/forms/input.svelte';
	import { safeEventHandler } from '$lib/helpers/asyncHandler';
	import { accounts } from '$module/accounts/account.svelte';
	import { createDepositTrx, createWithdrawTrx } from '$module/transaction/transaction.services';
	import { createTrxValidator } from '$module/transaction/transaction.validator';
	import type { HTMLFormAttributes, HTMLSelectAttributes } from 'svelte/elements';
	import { z, type ZodFormattedError } from 'zod';
	import { page } from '$app/stores';
	import fmtCurrency from '$lib/helpers/fmtCurrency';
	import { goto } from '$app/navigation';
	import { untrack } from 'svelte';
	import SearchParams from '$lib/helpers/URLSearchParams.svelte';
	import { get } from 'svelte/store';

	// [trx Type, feature available]
	const trxTypes = ['deposit', 'withdraw'] as const;

	let data = $state({ type: '' });
	const pageSearchParam = new SearchParams();

	$effect(() => {
		data.type = pageSearchParam.get('type') as string;
	});

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
	let formStatus = $state<{
		type: 'success' | 'failed';
		status: string;
	}>();

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

	/**
	 * Handle form Submission
	 */
	const handleSubmit: HTMLFormAttributes['onsubmit'] = async function (e) {
		e.preventDefault();
		const updateStatus = (status: string, type: 'success' | 'failed') =>
			(formStatus = { status, type });
		try {
			const result = await createTrxValidator.safeParseAsync(formData);

			if (result.success) {
				if (result.data.type === 'deposit') {
					await createDepositTrx(result.data);
					updateStatus('Deposit Created Successfully', 'success');
				} else {
					await createWithdrawTrx(result.data);
					updateStatus('Deposit Created Successfully', 'success');
				}
			} else {
				error = result.error.format();
			}
		} catch (e) {
			if (e instanceof Error) {
				updateStatus(`Failed to Create Transaction - ${e.message}`, 'failed');
			}
		}
	};

	/**
	 * Effect for Setting Form Transaction type based on Params;
	 */
	$effect(() => {
		if (pageSearchParam.get('type') === 'withdraw') {
			formData.type = 'withdraw';
		} else if (pageSearchParam.get('type') || pageSearchParam.get('type') === 'deposit') {
			formData.type = 'deposit';
		}
	});
</script>

<main class="">
	<div class="bg-white mb-5">
		<div class="container py-5">
			<div class="">
				<h1 class="text-3xl capitalize">Create a {formData.type} record</h1>
			</div>
		</div>
	</div>
	<div class="container">
		<div class=" max-w-[1000px] mx-auto">
			<form
				onsubmit={handleSubmit}
				class="space-y-8 p-4 rounded-2xl shadow-xl bg-white {formData.type}"
			>
				<div class="flex tabs tabs-{formData.type} w-fit mx-auto rounded-full border">
					{#each trxTypes as trx}
						<button
							type="button"
							class="px-4 py-2 rounded-full {trx === formData.type ? 'trx-active-button' : ''}"
							onclick={() => pageSearchParam.setAndChangeUrl('type', trx)}>{trx}</button
						>
					{/each}
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
								<p class="text-3xl font-medium font-oswald">
									{fmtCurrency(selectedAccountBalance.official)}
								</p>
							</div>
							<div class="flex-1">
								<p class="text-xs">unofficial</p>
								<p class="text-3xl font-medium font-oswald">
									{fmtCurrency(selectedAccountBalance.unOfficial)}
								</p>
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
								min={0}
								name="official_amount"
								type="number"
								placeholder="Amount that parents knows"
							/>
						</div>
						<div class="flex-1">
							<label for="unOfficial_amount">unOfficial</label>
							<Input
								bind:value={formData.amount.unOfficial}
								min={0}
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
	form.deposit {
		@apply border-green-300 border-2 shadow-green-700/10;
	}
	form.deposit .trx-active-button {
		@apply bg-green-600 text-white;
	}
	form.withdraw {
		@apply border-red-200 border-2 shadow-red-700/10;
	}
	form.withdraw .trx-active-button {
		@apply bg-red-500 text-white;
	}

	.tabs.tabs-deposit {
		@apply border-green-300;
	}
	.tabs.tabs-withdraw {
		@apply border-red-300;
	}
</style>
