import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import type { Unsubscriber } from 'svelte/store';

export default class SearchParams implements URLSearchParams {
	private params = $state<URLSearchParams>(new URLSearchParams(''));
	private _unsubscribe: Unsubscriber | undefined;

	get size(): number {
		return this.params.size;
	}

	constructor(_params?: string[][] | string | URLSearchParams | Record<string, string>) {
		if (_params) {
			this.params = new URLSearchParams(_params);
		} else {
			this._unsubscribe = page.subscribe((value) => {
				this.params = value.url.searchParams;
			});
		}
	}

	set(name: string, value: unknown) {
		const _newParams = new URLSearchParams(this.params);
		_newParams.set(name, String(value));
		this.params = _newParams;
	}
	setAndChangeUrl(name: string, value: unknown, url?: string) {
		if (browser) {
			this.set(name, value);
			goto(`${url ? '' : location.pathname}?` + this.params.toString());
		}
	}

	get(name: string) {
		return this.params.get(name);
	}
	toString(): string {
		return this.params.toString();
	}
	has(key: string) {
		return this.params.has(key);
	}
	append(name: string, value: string): void {
		return this.params.append(name, value);
	}

	delete(name: string, value?: string): void {
		return this.params.delete(name, value);
	}
	entries(): IterableIterator<[string, string]> {
		return this.params.entries();
	}
	forEach(
		callbackfn: (value: string, key: string, parent: URLSearchParams) => void,
		thisArg?: unknown
	): void {
		return this.params.forEach(callbackfn, thisArg);
	}
	getAll(name: string): string[] {
		return this.params.getAll(name);
	}
	keys(): IterableIterator<string> {
		return this.params.keys();
	}
	sort(): void {
		return this.params.sort();
	}
	values(): IterableIterator<string> {
		return this.params.values();
	}
	[Symbol.iterator](): IterableIterator<[string, string]> {
		return this.entries();
	}
	[Symbol.dispose]() {
		console.log('Destroying');
		this._unsubscribe?.();
	}
}
