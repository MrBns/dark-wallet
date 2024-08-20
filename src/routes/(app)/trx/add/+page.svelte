<script lang="ts">
	import PrimaryButton from '$lib/components/button/PrimaryButton.svelte';
	import Input from '$lib/components/forms/input.svelte';
	import { goto } from '$app/navigation';
	import { accounts } from '$module/accounts/account.svelte';
	import { createDepositTrx, createWithdrawTrx } from '$module/transaction/transaction.services';
	import { createTrxValidator } from '$module/transaction/transaction.validator';
	import type { HTMLFormAttributes, HTMLSelectAttributes } from 'svelte/elements';
	import { z, type ZodFormattedError } from 'zod';

	import fmtCurrency from '$lib/helpers/fmtCurrency';

	import SearchParams from '$lib/helpers/URLSearchParams.svelte';
	import toast from '$lib/helpers/toast';

	// [trx Type, feature available]
	const trxTypes = ['deposit', 'withdraw'] as const;

	let showDescription = $state(false);
	const pageSearchParam = new SearchParams();

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
				await toast({
					text: `${result.data.type} Record Added`
				}).then(() => {
					goto(`/trx?type=${result.data.type}`);
				});
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

<main class="mb-16 xl:mb-20 text-sm md:text-base">
	<div class="bg-white mb-5">
		<div class="container py-2 lg:py-5">
			<div class="">
				<h1 class="text-lg ml:text-xl xl:text-2xl capitalize">Create a {formData.type} record</h1>
			</div>
		</div>
	</div>
	<div class="container">
		<div class=" max-w-[1000px] mx-auto">
			<form
				onsubmit={handleSubmit}
				class="space-y-8 p-4 lg:p-8 rounded-2xl shadow-xl bg-white {formData.type}"
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
				<div class="flex flex-col lg:flex-row gap-5 lg:gap-8">
					<div class="lg:w-6/12">
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
					<div class="lg:w-6/12">
						<p class="text-sm mb-2">Available Balance</p>
						<div class="flex text-dark-500">
							<div class="flex-1">
								<p class="text-xs">official</p>
								<p class="text-xl lg:text-3xl font-medium font-oswald">
									{fmtCurrency(selectedAccountBalance.official)}
								</p>
							</div>
							<div class="flex-1">
								<p class="text-xs">unofficial</p>
								<p class="text-xl lg:text-3xl font-medium font-oswald">
									{fmtCurrency(selectedAccountBalance.unOfficial)}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div class="">
					<h3 class="text-base lg:text-xl mb-2">Amount</h3>
					<div class="flex flex-col lg:flex-row gap-4 pl-4 border-l gap-x-4">
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
					</div>
				</div>
				<div class="">
					{#if showDescription}
						<div class="">
							<label for="description">Write Some Description</label>
							<textarea
								bind:value={formData.description}
								name="description"
								id="description"
								class="bg-white resize-y border border-gray-300 p-2 w-full rounded"
								rows="4"
							></textarea>
						</div>
					{:else}
						<button
							onclick={() => (showDescription = true)}
							class="w-full border border-current p-1 text-sm text-dark-400/80 border-dashed active:text-dark-500 hover:bg-dark-100/80"
							>Add Description</button
						>
					{/if}
				</div>
				<div class="">
					<PrimaryButton class="max-sm:w-full">Add Transaction</PrimaryButton>
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
