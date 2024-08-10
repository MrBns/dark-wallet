<script lang="ts">
	import PrimaryButton from '$lib/components/button/PrimaryButton.svelte';
	import Input from '$lib/components/forms/input.svelte';
	import { accountCollection } from '$lib/firebase/firestore/firestore';
	import { AccountSchema, type TAccount } from '$lib/schema/Accounts';
	import { error } from '@sveltejs/kit';
	import { addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import type { FormEventHandler, HTMLFormAttributes } from 'svelte/elements';
	import { array, ZodError, type ZodFormattedError } from 'zod';
	import { browser } from '$app/environment';
	import { firebaseApp } from '$lib/firebase/init';

	let formEl = $state<HTMLFormElement>();
	let errors = $state<ZodFormattedError<TAccount>>();
	let accounts = $state<TAccount[]>([]);
	let totalOfficialAmount = $derived.by<number>(() => {
		return accounts.reduce((accumulator, current) => accumulator + current.amount.official, 0);
	});
	let totalUnofficialAmount = $derived.by<number>(() => {
		return accounts.reduce((accumulator, current) => accumulator + current.amount.unOfficial, 0);
	});

	const handleSubmit: HTMLFormAttributes['onsubmit'] = async function (e) {
		e.preventDefault();

		const formData = Object.fromEntries(new FormData(e.currentTarget).entries());

		const result = AccountSchema.safeParse({
			name: formData['account_name'],
			amount: {
				official: Number(formData['official_amount'] as string),
				unOfficial: Number(formData['unofficial_amount'])
			}
		});

		if (result.success) {
			addDoc(accountCollection, result.data).then((snapshot) => {});
			console.log(result.data);
		} else {
			errors = result.error.format();
		}
	};

	onMount(() => {
		getDocs(accountCollection)
			.then((value) => {
				accounts = value.docs.map((snapshot) => snapshot.data() as TAccount);
			})
			.catch((e) => console.error(e));
	});
	if (browser) {
		console.log(DocumentType);
	}
</script>

{#snippet errorSnp(error?: { _errors: string[] })}
	{#if error && Array.isArray(error._errors)}
		{#each error._errors as e}
			<p class="text-red-500">{e}</p>
		{/each}
	{/if}
{/snippet}

<main class="">
	<div class="container">
		<form
			onsubmit={handleSubmit}
			bind:this={formEl}
			class="max-w-[600px] p-4 space-y-4 bg-gray-100 mx-auto"
		>
			<div class="">
				<h3 class="text-3xl text-center">Add Accounts</h3>
			</div>
			<div class="">
				<label for="account_name">Account Name</label>
				<Input name="account_name" id="account_name" />
				{@render errorSnp(errors?.name)}
			</div>
			<div class="">
				<label for="unOfficial_balance">initial Unofficial balance</label>
				<Input type="number" id="unOfficial_balance" name="unofficial_amount" />

				{@render errorSnp(errors?.amount?.unOfficial)}
			</div>
			<div class="">
				<label for="official_amount">Initial Official Balance</label>
				<Input type="number" id="official_amount" name="official_amount" />
				{@render errorSnp(errors?.amount?.official)}
			</div>
			<div class="">
				<PrimaryButton type="submit">Submit</PrimaryButton>
			</div>
		</form>
	</div>

	<div class="container py-24">
		<div class="">
			<h1 class="mb-10 text-5xl">All Accounts</h1>
		</div>
		<div class="">
			<div class="flex gap-x-5 mb-5">
				<p class="p-3 bg-green-500 flex-1 text-white text-xl rounded">
					Total unofficial Amount <span class="text-5xl">{totalOfficialAmount}</span>
				</p>
				<p class="p-3 bg-red-500 flex-1 text-white text-xl rounded">
					Total unofficial Amount <span class="text-5xl">{totalUnofficialAmount}</span>
				</p>
				<p class="p-3 bg-orange-500 flex-1 text-white text-xl rounded">
					Total unofficial Extra Amount <span class="text-5xl"
						>{totalUnofficialAmount - totalOfficialAmount}</span
					>
				</p>
			</div>
			{#each accounts as acc}
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
