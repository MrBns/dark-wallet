<script lang="ts">
	import { writable, type Unsubscriber } from 'svelte/store';
	import Modal from './Modal.svelte';
	import { onDestroy } from 'svelte';
	let {
		title = 'Confirmation',
		html = ''
	}: {
		html?: string;
		title?: string;
	} = $props();
	let modal = $state<Modal>();

	let confirmed = writable<undefined | boolean>(undefined);

	export async function confirm(): Promise<boolean> {
		return new Promise((res, reject) => {
			const elements = modal?.getElements();
			console.log(elements);
			elements?.cancelButton?.addEventListener('click', function (e) {
				console.log('false');
				res(false);
			});
			elements?.okButton?.addEventListener('click', function (e) {
				res(true);
			});
		});
	}
</script>

<Modal
	showByDefault
	hideOnCancelClick={false}
	hideOnOkClick={false}
	{title}
	bind:this={modal}
	onCancelBtnClick={() => confirmed.set(false)}
	onOkBtnClick={() => confirmed.set(true)}
>
	<div class="p-4 min-w-[500px] min-h-[200px]">
		{@html html}
	</div>
</Modal>

<style lang="postcss">
</style>
