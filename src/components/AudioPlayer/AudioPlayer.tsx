import { useState, useEffect, useRef } from 'react'
import { PlaylistsType } from '../../types/types'
import { Playlist } from './Plyaylist/Plyaylist'
import s from './AudioPlayer.module.scss'
import { AiFillCaretRight, AiFillSound, AiFillStepForward, AiOutlinePause } from 'react-icons/ai'
import { FaShuffle } from 'react-icons/fa6'
import { getFileNameFromPath } from '../../functions/getFileNameFromPath'
import { getTimeFormat } from '../../functions/getTimeFormat'

type PropsType = {
	playlists: PlaylistsType
}

export const AudioPlayer: React.FC<PropsType> = ({playlists}) => {
	type PlaylistsKeysType = keyof typeof playlists

	const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistsKeysType>(Object.keys(playlists)[0])
	const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0)
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [isRandom, setIsRandom] = useState<boolean>(true)
	const [currentTime, setCurrentTime] = useState<number>(0)
	const [duration, setDuration] = useState<number>(0)
	const [volume, setVolume] = useState<number>(() => {
		const savedVolume = localStorage.getItem('audioPlayerVolume')
		return savedVolume ? parseFloat(savedVolume) : 1.0
	})

	const audioRef = useRef<HTMLAudioElement>(null)

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = volume
		}
	}, [volume])

	useEffect(() => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.play()
			} else {
				audioRef.current.pause()
			}
		}
	}, [isPlaying])

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.src = playlists[currentPlaylist].tracks[currentTrackIndex]
			if (isPlaying) {
				audioRef.current.play()
			}
		}
	}, [currentTrackIndex, currentPlaylist])

	const handlePlayPause = () => {
		setIsPlaying((prev) => !prev)
	}

	const handleNextTrack = () => {
		let nextIndex = 0;
		if (isRandom) {
			if (playlists[currentPlaylist].tracks.length > 1)
			{
				do {
					nextIndex = Math.floor(Math.random() * playlists[currentPlaylist].tracks.length)
				} while (currentTrackIndex === nextIndex)
			}
		} else {
			nextIndex = currentTrackIndex < playlists[currentPlaylist].tracks.length - 1 ? currentTrackIndex + 1 : 0
		}
		setCurrentTrackIndex(nextIndex)
	}

	const handlePlaylistChange = (playlist: PlaylistsKeysType) => {
		setCurrentPlaylist(playlist)
		let index = 0;
		if (isRandom) {
			index = Math.floor(Math.random() * playlists[playlist].tracks.length)
		}
		setCurrentTrackIndex(index)
		setTimeout(() => {
			setIsPlaying(true)
		}, 100);
	}

	const handleTrackChange = (playlist: PlaylistsKeysType) => (track: number) => {
		setCurrentPlaylist(playlist)
		setCurrentTrackIndex(track)
		setTimeout(() => {
			setIsPlaying(true)
		}, 100);
	}

	const handleChangeRandom = () => {
		setIsRandom(!isRandom)
	}

	const handleTimeUpdate = () => {
		if (audioRef.current) {
			setCurrentTime(audioRef.current.currentTime)
		}
	}

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (audioRef.current) {
			audioRef.current.currentTime = parseFloat(e.target.value)
		}
	}

	const handleMetadata = () => {
		if (audioRef.current) {
			setDuration(audioRef.current.duration)
		}
	}

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(e.target.value)
		setVolume(newVolume)
		localStorage.setItem('audioPlayerVolume', newVolume.toString())
	}

	return (
		<div>
			<h1 className={s.h1}>D&D Audio Player</h1>
			<div className={s.playlist}>
				{Object.entries(playlists).map(([key, playlist]) => <Playlist key={key} playlist={playlist} isPlaying={isPlaying} selected={currentPlaylist === key} selectedTrack={currentTrackIndex} onChangePlayList={() => handlePlaylistChange(key)} onChangeTrack={handleTrackChange(key)} onPause={handlePlayPause} />)}
			</div>
			<div className={s.player}>
				<button className={s.button} onClick={handlePlayPause}>{isPlaying ? <AiOutlinePause className={s.icon} /> : <AiFillCaretRight className={s.icon} />}</button>
				<button className={s.button} onClick={handleNextTrack}><AiFillStepForward className={s.icon} /></button>
				{playlists[currentPlaylist] && (
					<div className={s.track}>
						{playlists[currentPlaylist].image &&<img className={s.track_image} src={playlists[currentPlaylist].image} />}
						<div className={s.track_info}>
						<div className={s.track_title}>{getFileNameFromPath(playlists[currentPlaylist].tracks[currentTrackIndex])}</div>
							<div className={s.track_progress}>
								<div className={s.track_time}>
									<span>{getTimeFormat(currentTime)}</span>
									<span>{getTimeFormat(duration)}</span>
								</div>
								<input
									type="range"
									className={s.range}
									value={currentTime || 0}
									onChange={handleSeek}
									min="0"
									max={duration}
								/>
							</div>
						</div>
					</div>
				)}
				<button className={[s.button, isRandom ? s.button_active : ''].join(' ')} onClick={handleChangeRandom}><FaShuffle className={s.icon} /></button>
				<div className={s.volume}>
					<AiFillSound className={s.volume_icon} />
					<input
						type="range"
						min="0"
						max="1"
						step="0.01"
						value={volume}
						onChange={handleVolumeChange}
						className={s.range}
					/>
				</div>
			</div>
			<audio
				ref={audioRef}
				src={playlists[currentPlaylist].tracks[currentTrackIndex]}
				onEnded={handleNextTrack}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleMetadata}
				preload="metadata"
			/>
		</div>
	)
}