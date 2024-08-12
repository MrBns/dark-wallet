<script lang="ts">
	import BottomBar from '$lib/components/layouts/Navbar.svelte';

	let { children } = $props();
</script>

{@render children()}
<BottomBar />
