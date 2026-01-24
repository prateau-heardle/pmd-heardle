const SEED = 514441011

// seeded random algorithm
const mulberry32 = (step: number): number => {
	let t = SEED + step * 0x6d2b79f5
	t = Math.imul(t ^ (t >>> 15), t | 1)
	t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
	return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

// array shuffling with Fisher–Yates Shuffle
const shuffleArray = <T> (array: T[], songNumber: number): T[] => {
	const baseRngStep = Math.floor(songNumber / array.length)
	let i = array.length, j = 0
	let temp
	while (i--) {
		// get unique rng value
		const actualRngStep = baseRngStep * array.length + i
		// pick a remaining element
		j = Math.floor(mulberry32(actualRngStep) * (i + 1))
		// swap it with the current element
		temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}
	return array
}

export const getTodaySong = <T> (array: T[], todayId: number): T => {
	return shuffleArray([...array], todayId)[todayId % array.length]
}
