<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { default as cuid } from '$lib/helpers/cuid';

	let {
		class: ClassName = '',
		id = `input` + cuid(10),
		value = $bindable(''),
		label,
		errors,
		...restProps
	}: HTMLInputAttributes & {
		label?: string;
		errors?: string[];
	} = $props();
</script>

{#snippet input()}
	<input
		{...restProps}
		bind:value
		{id}
		class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5"
	/>
	{#if errors && errors.length}
		<ul>
			{#each errors as err}
				<li>{err}</li>
			{/each}
		</ul>
	{/if}
{/snippet}

{#if label}
	<div class="">
		<label for={id}></label>
		{@render input()}
	</div>
{:else}
	{@render input()}
{/if}
