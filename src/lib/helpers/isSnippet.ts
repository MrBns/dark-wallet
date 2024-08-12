import type { Snippet } from 'svelte';

export default function isSnippet<T extends unknown[] = []>(
	snippet: Snippet<T> | undefined | null
): snippet is Snippet<T> {
	return typeof snippet === 'function';
}
