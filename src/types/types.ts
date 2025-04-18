import { ComponentType } from "react"

export type RoutersType = {
	[key: string]: {
		path: string
		title: string
		Component: ComponentType<{}>
		hideMenu?: boolean
		menuImage?: string
	}
}

export type SetTitleType = {
	setTitle?: (title: string) => void
}

export type PlaylistsDataType = {
	[key: string]: {
		name: string
		image?: string
	}
}

export type PlaylistType = PlaylistsDataType[string] & {
	tracks: string[]
}

export type PlaylistsType = {
	[key: string]: PlaylistType
}

export type ImportItemsType = Record<string, () => Promise<{ default: string }>>

export type BattleCalcInputsType = {
	players: Array<BattleCalcPalyerType>
	enemies: Array<BattleCalcEnemyType>
}

export type BattleCalcPalyerType = {
	name?: string
	hp: number
	armor: number
	initiative: number
	strength?: number
	dexterity?: number
	constitution?: number
	intelligence?: number
	wisdom?: number
	charisma?: number
	attack1?: number
	attack2?: number
}

export type BattleCalcEnemyType = {
	name?: string
	hp: number
	armor: number
	initiative: number
	attack1?: number
	attack2?: number
}

export type CharacteristicType = {
	id: 'strength' | 'dexterity' | 'constitution' |	'intelligence' | 'wisdom' | 'charisma'
	name: string
}

export type DiceFaces = 4 | 6 | 8 | 10 | 12 | 20