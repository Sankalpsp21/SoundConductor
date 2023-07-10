import { MoonIcon } from '@heroicons/react/24/solid';

export const config = {
	title: 'daisyUI',
	home: '/',
	pages: ['/', '/auth'],
	themes: [
		{
			name: 'Light',
			id: 'winter',
			icon: MoonIcon
		}
	],
	masonryColumns: {
		default: 4,
		960: 3,
		730: 2,
		500: 1
	}
};
