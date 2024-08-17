<script lang="ts">
	import type { z, ZodFormattedError } from 'zod';
	import Modal from './Modal.svelte';
	import { AccountSchema } from '$module/accounts/account.validator';
	import { addDoc } from 'firebase/firestore';
	import { accountCollection } from '$module/accounts/account.constant';
	import Input from '../forms/input.svelte';
	import { getAllAccountsFromDb, uploadAccountLogo } from '$module/accounts/account.services';

	let {
		class: className = '',
		id = '',
		...props
	}: {
		class?: string;
		id?: string;
	} = $props();

	let formEl = $state<HTMLFormElement>();
	let errors = $state<ZodFormattedError<z.infer<typeof AccountSchema>>>();
	let modal = $state<Modal>();
	let formProgressStatus = $state<'logo-uploading' | 'completed' | 'creating' | 'error' | 'none'>(
		'none'
	);
	let formError = $state('');

	const handleSubmit = async function () {
		try {
			const formData = Object.fromEntries(new FormData(formEl).entries());
			// Uploading Files;
			if (formData.logo_file && formData.logo_file instanceof File) {
				console.log(formData.logo_file);
				formProgressStatus = 'logo-uploading';
				const { success, err, pubLink } = await uploadAccountLogo(formData.logo_file);

				if (success) {
					formData.logo = pubLink;
				} else {
					formProgressStatus = 'error';
					formError = err;

					return;
				}
				formProgressStatus = 'creating';
			}

			const result = AccountSchema.safeParse({
				name: formData['account_name'],
				amount: {
					official: Number(formData['official_amount'] as string),
					unOfficial: Number(formData['unofficial_amount'])
				},
				logo: formData['logo']
			});
			console.log(result);

			if (result.success) {
				errors = undefined;
				addDoc(accountCollection, result.data).then((snapshot) => {
					modal?.hide();
				});
			} else {
				errors = result.error.format();
			}
		} catch (e) {
			formProgressStatus = 'none';
			if (e instanceof Error) {
				formError = e.message;
			}
		}
	};

	//Component Export;
	export const show = () => modal?.show();
	export const hide = () => modal?.hide();
</script>

{#snippet errorSnp(error?: { _errors: string[] })}
	{#if error && Array.isArray(error._errors)}
		{#each error._errors as e}
			<p class="text-red-500">{e}</p>
		{/each}
	{/if}
{/snippet}

<Modal
	debug
	bind:this={modal}
	onOkBtnClick={() => handleSubmit()}
	title="Add a New accounts"
	hideOnOkClick={false}
	class=" {className}"
	{id}
>
	<form bind:this={formEl} class="max-w-[600px] w-screen p-4 py-8 space-y-4 mx-auto">
		<div class="">
			<label for="account_name">Account Name</label>
			<Input required name="account_name" id="account_name" />
			{@render errorSnp(errors?.name)}
		</div>
		<div class="">
			<label for="unOfficial_balance">Your Total Balance (with UnOfficial)</label>
			<Input type="number" id="unOfficial_balance" name="unofficial_amount" />

			{@render errorSnp(errors?.amount?.unOfficial)}
		</div>
		<div class="">
			<label for="official_amount">Your Total Balance (only Official)</label>
			<Input type="number" id="official_amount" name="official_amount" />
			{@render errorSnp(errors?.amount?.official)}
		</div>
		<div class="">
			<label for="official_amount">Add a Account Logo</label>
			<input
				name="logo_file"
				type="file"
				class="block border p-2 border-gray-300 w-full rounded-md file:bg-gray-200 file:border file:border-gray-300
				file:px-5 file:p-2 file:border-solid file:rounded"
			/>
			{@render errorSnp(errors?.amount?.official)}
		</div>

		<div class="">
			{#if formProgressStatus === 'logo-uploading'}
				<p class="text-yellow-500 text-sm">Please Wait Logo is Uploading</p>
			{:else if formProgressStatus === 'error' || formError}
				<p class="text-red-500 text-sm">{formError}</p>
			{/if}
		</div>
	</form>
</Modal>

<!-- <style lang="postcss">
</style> -->
