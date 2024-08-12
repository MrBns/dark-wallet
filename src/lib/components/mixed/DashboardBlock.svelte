<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		title,
		tw_bg: bg = 'bg-white',
		tw_titleClass: titleClass,
		...restProps
	}: {
		children: Snippet;
		title: string;
		tw_bg?: `bg${string}`;
		tw_titleClass?: string;
		class?: string;
	} = $props();

	$inspect(title);
</script>

<section class="px-6 py-4 rounded-xl space-y-4 text-gray-600 {bg} {restProps.class}">
	<div class="">
		<h2 class="capitalize text-lg font-medium text-gray-700">{@html title}</h2>
	</div>
	{@render children()}
</section>

<style lang="postcss">
</style>
