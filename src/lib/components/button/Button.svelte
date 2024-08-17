<script lang="ts">
	import isSnippet from '$lib/helpers/isSnippet';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		text = '',
		icon = '',
		isLoading = false,
		variant = 'primary',
		size = 'md',
		margin = 'm-0',
		iconClass = '',
		iconDirection = 'after',
		link = '',
		children,
		class: className,
		...props
	}: HTMLAttributes<HTMLButtonElement> & {
		text?: string;
		icon?: string;
		isLoading?: boolean;
		variant?:
			| 'primary'
			| 'primary-outline'
			| 'gray'
			| 'gray-outline'
			| 'light-outline'
			| 'green'
			| 'green-outline'
			| 'orange'
			| 'orange-outline'
			| 'black'
			| 'black-outline'
			| 'none';
		size?: 'sm' | 'md' | 'lg' | 'xl';
		margin?: `m${string}`;
		iconClass?: string;
		iconDirection?: 'before' | 'after';
		link?: string;
		class?: string;
		children?: Snippet<[string]>;
	} = $props();

	function variantClass(_variant: typeof variant) {
		switch (_variant) {
			case 'primary':
				return `text-white border-transparent bg-lavendar`;
			case 'primary-outline':
				return `border-primary-600 text-primary-600 hover:text-white hover:bg-primary-600 transition-all`;
			case 'gray':
				return `text-white border-transparent bg-[#262626] hover:bg-ebony focus:ring ring-lavendar`;
			case 'gray-outline':
				return ``;
			case 'light-outline':
				return `border-gray-300 hover:bg-gray-50 hover:text-black ${size === 'xl' ? 'text-gray-700' : ''}`;
			case 'green':
				return `text-white border-green-600 bg-green-600 hover:bg-green-700/80 hover:border-green-700/80`;
			case 'green-outline':
				return ` border-green-600 text-green-600 hover:text-white hover:bg-green-600 transition-all`;
			case 'orange':
				return `text-white border-orange-600 bg-orange-600 hover:bg-orange-700/80 hover:border-orange-700/80`;
			case 'orange-outline':
				return `border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600 transition-all`;
			case 'black':
				return `text-white border-transparent bg-mine-shaft`;
			case 'black-outline':
				return ``;
			case 'none':
				return ``;
			default:
				return `transition-all`;
		}
	}
	function sizeClass(_size: typeof size) {
		switch (_size) {
			case 'sm':
				return `border rounded text-sm px-3 py-1.5 font-regular`;
			case 'md':
				return `border text-sm lg:text-base px-2.5 lg:px-4 py-1 lg:py-2 rounded-lg  font-medium`;
			case 'lg':
				return `border text-sm md:text-base px-3 lg:px-5  py-2 lg:py-2.5 text-base rounded-lg  font-medium`;
			case 'xl':
				return `border-2 text-xl font-semibold px-6 py-3 rounded-xl`;
		}
	}
</script>

<button
	{...props}
	class="group inline-block
			{sizeClass(size)} {variantClass(variant)} {margin} {className}"
>
	{#if isSnippet(children)}
		{@render children()}
	{:else}
		{#if icon && iconDirection === 'before'}
			<iconify-icon
				class="{iconClass} align-sub text-[1.2em] transition-all group-hover:-translate-x-1"
				{icon}
			></iconify-icon>
		{/if}
		<span class="inline-block leading-6">
			<!-- eslint-disable-next-line svelte/no-at-html-tags */}-->
			{@html text}
		</span>
		{#if icon && iconDirection === 'after'}
			<iconify-icon
				class="{iconClass} align-middle text-[1.2em] transition-all group-hover:translate-x-1"
				{icon}
			></iconify-icon>
		{/if}
	{/if}
</button>
