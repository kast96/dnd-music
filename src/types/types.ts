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
}

export type BattleCalcPalyerType = {
	hp: number
	armor: number
}