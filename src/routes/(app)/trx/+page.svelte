<script lang="ts">
	import { goto } from '$app/navigation';
	//  let {
	//  ...props
	//  }:{} = $props()

	import PrimaryButton from '$lib/components/button/PrimaryButton.svelte';
</script>

<main class="">
	<div class="container">
		<PrimaryButton onclick={() => goto('trx/add')}>Create Transaction</PrimaryButton>
	</div>
</main>

<style lang="postcss">
</style>
