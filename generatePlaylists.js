import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Получаем __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicDir = path.join(__dirname, 'public')
const playlistsDir = path.join(publicDir, 'playlists')
const outputFile = path.join(publicDir, 'playlists.json')

function scanPlaylists() {
	const playlists = []

	// Чтение директории /public/playlists/
	const playlistFolders = fs.readdirSync(playlistsDir, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name)

	playlistFolders.forEach(folder => {
		const playlistPath = path.join(playlistsDir, folder)
		const files = fs.readdirSync(playlistPath)

		const playlist = {
			name: folder,
			image: null,
			tracks: []
		};

		files.forEach(file => {
			const ext = path.extname(file).toLowerCase()

			if (['.png', '.jpg', '.jpeg'].includes(ext)) {
				playlist.image = `playlists/${folder}/${file}`
			} else if (ext === '.mp3') {
				playlist.tracks.push(`playlists/${folder}/${file}`)
			}
		})

		playlists.push(playlist)
	})

	// Запись результата в JSON-файл
	fs.writeFileSync(outputFile, JSON.stringify(playlists, null, 2))
	console.log('Playlists JSON file has been generated successfully.')
}

scanPlaylists()