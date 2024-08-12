<script lang="ts">
	import { browser } from '$app/environment';
	import { init } from '$module/index';
	let { children } = $props();
	import '../app.css';

	if (browser) {
		init()
			.then(() => console.log('module loaded successfully'))
			.catch((e) => console.error('something wrong to load module', e));
	}
</script>

{@render children()}

<style lang="postcss">
</style>
