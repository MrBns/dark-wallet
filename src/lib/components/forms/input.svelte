<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { default as cuid } from '$lib/helpers/id';

	let {
		class: ClassName = '',
		id = `input` + cuid(10),
		value = $bindable(''),
		...restProps
	}: HTMLInputAttributes & {} = $props();
</script>

<input
	{...restProps}
	bind:value
	{id}
	class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5
    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
/>
