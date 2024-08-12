export function Store<T>(initialValue: T) {
	let state = $state<T>(initialValue);
	return {
		get value() {
			return state;
		},
		set value(value: T) {
			state = value;
		},
		update(cb: (prev: T) => T) {
			cb(state as T);
		}
	};
}

export function Derived<T>(expression: T) {
	const _value = $derived(expression);
	return {
		get value() {
			return _value;
		}
	};
}
export function DerivedBy<T>(expression: () => T) {
	const _value = $derived.by(expression);
	return {
		get value() {
			return _value;
		}
	};
}
