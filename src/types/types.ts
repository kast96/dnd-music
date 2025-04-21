import { ComponentType } from "react"
import { availableFaces } from "../functions/availableFaces"

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
	players: Array<FighterCalcPlayerType>
	enemies: Array<FighterCalcPlayerType>
}

export type CharacteristicType = {
	id: 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma'
	name: string
}

type CharacteristicIds = CharacteristicType['id']
export type CharacteristicListType = Partial<Record<CharacteristicIds, number>>

export type FighterCalcPlayerType = {
	name?: string
	hp: number
	armor: number
	initiative: number
	attack1?: string
	attack2?: string
	count?: number
} & CharacteristicListType

export type DiceFaces = typeof availableFaces[number]