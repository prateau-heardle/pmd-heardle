import type { Category, MusicElement, MusicElementJson } from './types'
import musics from '../config/musics.json'
import categories from '../config/categories.json'

export const HEARDLE_SPLITS = [1, 2, 4, 7, 11, 16]

export const START_DATE = "2024-02-03T00:00"; // Arbitrary original start date, used to know the current heardle id

export enum LocalStorageKeys {
    SHOW_HELP = 'reactHeardle__showHelp',
    GAME_STATE = 'reactHeardle__gameState',
    GAME_STATE_INFINITE = 'reactHeardle__gameStateInfinite'
}

const sortMusicById = (music1: MusicElement, music2: MusicElement): number => music1.id - music2.id

const mapToMusic = (music: MusicElementJson, categories: Category[]): MusicElement => {
    const category = categories.find(cat => cat.id === music.categoryId)!.name
    return {
        ...music,
        category
    }
}

const sortCategoryById = (category1: Category, category2: Category): number => category1.id - category2.id

export const ALL_CATEGORIES = (categories as Category[])
    .sort(sortCategoryById)

export const ALL_MUSICS = (musics as MusicElementJson[])
    .map((music) => mapToMusic(music, ALL_CATEGORIES))
    .sort(sortMusicById)
