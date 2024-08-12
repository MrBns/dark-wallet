<script lang="ts">
	import type { z, ZodFormattedError } from 'zod';
	import Modal from './Modal.svelte';
	import { AccountSchema } from '$module/accounts/account.validator';
	import { addDoc } from 'firebase/firestore';
	import { accountCollection } from '$module/accounts/account.constant';
	import Input from '../forms/input.svelte';

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

	const handleSubmit = async function () {
		const formData = Object.fromEntries(new FormData(formEl).entries());
		console.log(formData);

		const result = AccountSchema.safeParse({
			name: formData['account_name'],
			amount: {
				official: Number(formData['official_amount'] as string),
				unOfficial: Number(formData['unofficial_amount'])
			}
		});

		if (result.success) {
			addDoc(accountCollection, result.data).then((snapshot) => {});
			errors = undefined;
		} else {
			errors = result.error.format();
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
			<label for="unOfficial_balance">initial Unofficial balance</label>
			<Input type="number" id="unOfficial_balance" name="unofficial_amount" />

			{@render errorSnp(errors?.amount?.unOfficial)}
		</div>
		<div class="">
			<label for="official_amount">Initial Official Balance</label>
			<Input type="number" id="official_amount" name="official_amount" />
			{@render errorSnp(errors?.amount?.official)}
		</div>
	</form>
</Modal>

<!-- <style lang="postcss">
</style> -->
