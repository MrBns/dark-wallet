<script lang="ts">
</script>

{#snippet navLink(text?: string, link?: string)}
	<li class="">
		<a
			href={link}
			class=" px-3 lg:px-6 py-2 lg:py-3 text-xs lg:text-base inline-block text-gray-700 font-normal uppercase hover:bg-gray-200 rounded"
			>{text}</a
		>
	</li>
{/snippet}
<nav class="bg-white fixed bottom-0 w-full py-2">
	<div class="">
		<ul class="flex justify-center">
			{@render navLink('Home', '/')}
			{@render navLink('Transaction', '/trx?type=deposit')}
			{@render navLink('Accounts', '/accounts')}
		</ul>
	</div>
</nav>

<style lang="postcss">
</style>
