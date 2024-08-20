<script lang="ts">
	import toast from '$lib/helpers/toast';
	import { onMount } from 'svelte';

	onMount(() => {
		toast({
			text: 'Hello EveryOne',
			type: 'success'
		});
	});
</script>

<button class="border p-2 text-lg" onclick={() => toast()}> add more toast </button>
