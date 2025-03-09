declare module '@lucide/svelte/icons/*' {
	import type { IconProps } from '@lucide/svelte/dist/types';
	import type { SvelteComponent } from 'svelte';
	const cmp: SvelteComponent<IconProps>;

	export = cmp;
}
