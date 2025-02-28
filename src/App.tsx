import { useEffect, useState } from "react"
import { playlists as playlistsData } from "./data/playlists/playlists"
import { PlaylistsType, ImportItemsType } from "./types/types"
import { AudioPlayer } from "./components/AudioPlayer/AudioPlayer"

const importItems: ImportItemsType = import.meta.glob('./data/playlists/**/*.(mp3)') as ImportItemsType
const importImages: ImportItemsType = import.meta.glob('./data/playlists/**/(image.jpeg)') as ImportItemsType

function App() {
	let [playlists, setPlaylist] = useState<PlaylistsType>()

	useEffect(() => {
    const loadFiles = async () => {
      const musicFiles: { [key: string]: string } = {}
      const imageFiles: { [key: string]: string } = {}

      for (const [path, importFn] of Object.entries(importItems)) {
        const file = await importFn()
        musicFiles[path] = file.default
      }

      for (const [path, importFn] of Object.entries(importImages)) {
        const file = await importFn()
        imageFiles[path] = file.default
      }

			const playlists = Object.fromEntries(
				Object.entries(playlistsData).map(([key, value]) => {
					return [
						key,
						{
							...value,
							image: imageFiles[`./data/playlists/${key}/image.jpeg`],
							tracks: Object.entries(musicFiles).map(([path, file]) => {
								return path.startsWith(`./data/playlists/${key}/`) ? file : ''
							}).filter(file => file !== '')
						}
					]
				})
			)
			
			setPlaylist(playlists)
    }

    loadFiles()
  }, [])

	return (
		<>
			{!playlists && 'Loading...'}
			{playlists && (
				<>
					<AudioPlayer playlists={playlists} />
				</>
			)}
		</>
	)
}

export default App