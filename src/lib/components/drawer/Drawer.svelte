<script lang="ts" context="module">
	export type DrawerConfig = {
		debug?: boolean;
		isBackdrop?: boolean;
		defaultPosition?: boolean;
		positionClass?: string;
		bodyClass?: string;
		titleClass?: string;
		direction?: 'left' | 'right' | 'bottom' | 'top';
	};
</script>

<script lang="ts">
	import iconify from '$lib/helpers/iconify';
	import isSnippet from '$lib/helpers/isSnippet';
	import { tick, type Snippet } from 'svelte';
	import { expoIn, expoInOut, circInOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	let {
		title = 'Drawer Title',
		direction = 'right',
		isBackdrop = true,
		positionClass = '',
		...restProps
	}: DrawerConfig & {
		title?: string;
		children?: Snippet;
		onHide?: () => unknown;
	} = $props();

	let zIndex = $state(50);
	let isShow = $state<boolean>(Boolean(restProps.debug));
	const isBottom = $derived(direction === 'bottom');
	const isLeft = $derived(direction === 'left');
	const isRight = $derived(direction === 'right');
	const isTop = $derived(direction === 'top');

	const positionStyles = {
		top: '',
		right: '',
		bottom: `bottom-0 left-0 w-full sm:w-auto sm:min-w-[300px] sm:left-1/2 sm:-translate-x-1/2 
        sm:bottom-2 sm:rounded-2xl`,
		left: ''
	} as const;

	const contentAnimation = {
		top: '',
		right: '',
		bottom: '',
		left: ''
	};

	export function hide() {
		isShow = false;
		restProps.onHide?.();
	}

	export function show(zIndex?: number) {
		if (zIndex) {
			zIndex = zIndex;
		}
		tick().then(() => (isShow = true));
	}
</script>

<!-- Drawers -->
<div class="contents" id="">
	<!-- backdrop -->
	{#if isShow && isBackdrop}
		<div
			transition:fade={{ duration: 200, delay: 200 }}
			class="backdrop fixed w-full bottom-0 left-0 h-full bg-black/15"
			style="z-index: {zIndex - 1}"
		></div>
	{/if}

	<!-- content -->
	{#if isShow}
		<div
			transition:fly={isBottom ? { y: 200, duration: 300, easing: circInOut } : {}}
			class="fixed bg-white rounded-t-2xl
        {positionClass ? positionClass : positionStyles[direction]}"
			style="z-index: {zIndex}"
		>
			<div class="title items-center text-[0px] flex p-2 px-3 border-b">
				<h3 class="flex-1 font-medium text-base text-dark-600">{title}</h3>
				<button
					onclick={() => (isShow = false)}
					class="border rounded-full border-dark-300 text-dark-400 p-0.5 active:bg-primary-200 hover:text-primary-600"
				>
					<iconify-icon icon={iconify.timesBold} class="text-2xl"></iconify-icon>
				</button>
			</div>

			<div class=" {isBottom ? 'min-h-[300px]' : ''}">
				{#if isSnippet(restProps.children)}
					{@render restProps.children()}
				{/if}
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
</style>
