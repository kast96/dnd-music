import { useEffect, useState } from "react"
import { PlaylistsType, SetTitleType } from "../types/types"
import { AudioPlayer } from "../components/AudioPlayer/AudioPlayer"
import { routes } from "../routes/routes"
import { useOutletContext } from "react-router"

export const MusicPage = () => {
	const [playlists, setPlaylists] = useState<PlaylistsType | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	const { setTitle } = useOutletContext<SetTitleType>();

	useEffect(() => {
		setTitle?.(routes.music.title)
	}, [setTitle])

	useEffect(() => {
		// Загружаем playlists.json из публичной папки
		const loadPlaylists = async () => {
			try {
				const response = await fetch("/playlists.json")
				if (!response.ok) {
					throw new Error("Не удалось загрузить плейлисты")
				}
				const data = await response.json()

				// Преобразуем данные в нужный формат
				const formattedPlaylists = data.reduce((acc: PlaylistsType, playlist: any) => {
					acc[playlist.name] = {
						name: playlist.name,
						image: playlist.image,
						tracks: playlist.tracks,
					}
					return acc
				}, {})

				setPlaylists(formattedPlaylists)
			} catch (err) {
				setError(err instanceof Error ? err.message : "Произошла ошибка")
			} finally {
				setLoading(false)
			}
		}

		loadPlaylists()
	}, [])

	if (loading) {
		return <div>Загрузка...</div>
	}

	if (error) {
		return <div>Ошибка: {error}</div>
	}

	return (
		<>
			{playlists && <AudioPlayer playlists={playlists} />}
		</>
	)
}