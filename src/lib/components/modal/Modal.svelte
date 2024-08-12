<script lang="ts" context="module">
	export type ModalConfig = {
		defaultStyle?: boolean;
		showCancelButton?: boolean;
		onCancelBtnClick?: () => void;
		showOkButton?: boolean;
		onOkBtnClick?: () => void;
		showTitle?: boolean;
		customTitleSnp?: Snippet;
		showFooter?: boolean;
		customFooterSnp?: Snippet;
		hideOnCancelClick?: boolean;
		hideOnOkClick?: boolean;
	};
</script>

<script lang="ts">
	import isSnippet from '$lib/helpers/isSnippet';

	import { onMount, type Snippet } from 'svelte';

	let {
		class: className = '',
		id = 'modal_' + globalThis.crypto.randomUUID(),
		showFooter = true,
		showTitle = true,
		showCancelButton = true,
		showOkButton = true,
		defaultStyle = true,
		hideOnOkClick = true,
		hideOnCancelClick = true,
		title,
		...props
	}: ModalConfig & {
		class?: string;
		id?: string;
		title?: string;
		children: Snippet;
	} = $props();

	let isShow = $state<Boolean>(false);
	let modalEl = $state<HTMLDivElement>();

	const customEvent = new CustomEvent('action', {
		detail: {
			ok: false,
			cancel: false
		}
	});

	export function show() {
		isShow = true;
	}

	export async function hide() {
		isShow = false;
	}

	function handleOkClick() {
		if (hideOnOkClick) isShow = false;
		props?.onOkBtnClick?.();
	}
	function handleCancelClick() {
		if (hideOnCancelClick) isShow = false;
		props?.onCancelBtnClick?.();
	}
</script>

{#if isShow}
	<div class="fixed w-full h-full bg-black/30 z-50 backdrop-blur left-0 bottom-0"></div>
	<div
		bind:this={modalEl}
		class="fixed bg-white bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 z-50 {className}
        {defaultStyle ? 'min-w-[400px] rounded-xl' : ''}"
		{id}
	>
		{#if defaultStyle}
			{#if title}
				<div class="flex border-b bg-gray-100 title p-2 rounded-t-lg">
					<h1 class="text-lg text-gray-700 font-medium select-none">{@html title}</h1>
				</div>
			{/if}
			<div class="body">
				{@render props.children()}
			</div>

			{#if showFooter}
				<div class="flex footer">
					{#if showCancelButton}
						<button
							onclick={handleCancelClick}
							class="flex-1 border-2 active:border-red-500 active:bg-red-100 border-red-100 hover:border-red-300 bg-red-100 text-red-900 hover:bg-red-200 px-6 py-2 rounded-bl-md"
							>Cancel</button
						>
					{/if}
					{#if showOkButton}
						<button
							onclick={handleOkClick}
							class="flex-1 border-2 border-green-100 active:border-green-600 active:bg-green-100 hover:border-green-400 bg-green-100 text-green-900 hover:bg-green-200 px-6 py-2 rounded-br-md"
							>Ok</button
						>
					{/if}
				</div>
			{:else if isSnippet(props.customFooterSnp)}
				{@render props.customFooterSnp()}
			{/if}
		{:else}
			{@render props.children()}
		{/if}
	</div>
{/if}
<!-- <style lang="postcss">
</style> -->
