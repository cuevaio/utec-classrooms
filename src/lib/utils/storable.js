import { writable } from 'svelte/store';

/**
 *
 * @param {any} data
 * @returns
 */
export function storable(data) {
	const store = writable(data);
	const { subscribe, set } = store;
	const isBrowser = typeof window !== 'undefined';

	isBrowser && localStorage.storable && set(JSON.parse(localStorage.storable));

	return {
		subscribe,
		// @ts-ignore
		set: (n) => {
			isBrowser && (localStorage.storable = JSON.stringify(n));
			set(n);
		},
		// @ts-ignore
		update: (cb) => {
			// @ts-ignore
			const updatedStore = cb(get(store));

			isBrowser && (localStorage.storable = JSON.stringify(updatedStore));
			set(updatedStore);
		}
	};
}
