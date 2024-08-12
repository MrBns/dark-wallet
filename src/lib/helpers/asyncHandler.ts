type EventHandler<E extends Event = Event, T extends EventTarget = Element> = (
	event: E & { currentTarget: EventTarget & T }
) => unknown;

// type EventHandler = (e: Event) => unknown;

export function safeEventHandler<T extends EventHandler | undefined | null>(
	cb: T | null | undefined
) {
	if (cb === undefined) {
		return undefined;
	} else if (cb === null) {
		return null;
	} else {
		return (e: Parameters<typeof cb>['0']) => {
			try {
				cb(e);
			} catch (error) {
				console.error(error);
				return undefined; // or some other default value
			}
		};
	}
}
