export type MusicElementJson = {
	id: number,
	url: string,
	name: {
		[langKey: string]: string
	},
	categoryId: number
}

export type Category = {
	id: number,
	name: {
		[langKey: string]: string
	},
}

export type MusicElement = {
	id: number,
	url: string,
	name: {
		[langKey: string]: string
	},
	categoryId: number,
	category: {
		[langKey: string]: string
	}
}

export type GameState = {
	date: string,
	response: number,
	attempts: (number | undefined)[]
}

// For soundcloud widget API
declare global {
	interface Window {
		SC?: any;
	}
}
