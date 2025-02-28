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