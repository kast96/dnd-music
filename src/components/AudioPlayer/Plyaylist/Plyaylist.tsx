import { PlaylistType } from "../../../types/types"
import { TrackItem } from "./TrackItem/TrackItem"
import { AiOutlinePlayCircle, AiOutlinePauseCircle, AiOutlineDown } from "react-icons/ai"
import s from './Plyaylist.module.scss'
import { Accordion, AccordionToggle, AccordionContent } from "../../Accordion/Accordion"

type PropsType = {
	playlist: PlaylistType
	isPlaying: boolean
	selected: boolean
	selectedTrack: number
	onChangePlayList: () => void
	onChangeTrack: (track: number) => void
	onPause: () => void
}

export const Playlist: React.FC<PropsType> = ({playlist, isPlaying, selected, selectedTrack, onChangePlayList, onChangeTrack, onPause}) => {
	const isPlayingPlaylist = isPlaying && selected
	
	const handleTrackChange = (track: number) => () => {
		onChangeTrack(track)
	}
	
	return (
		<div className={[s.container, selected ? s.container_selected : ''].join(' ')}>
			<div className={s.image} onClick={isPlayingPlaylist ? onPause : onChangePlayList}>
				{playlist.image && (
					<img className={s.picture} src={playlist.image} alt={playlist.name} />
				)}
				{!isPlayingPlaylist && <AiOutlinePlayCircle className={s.icon} />}
				{isPlayingPlaylist && <AiOutlinePauseCircle className={s.icon} />}
			</div>
			<div className={s.content}>
				<div className={s.title}>{playlist.name}</div>
				<Accordion className={s.tracks_container}>
					<AccordionToggle className={s.tracks_header}>
						<div className={s.tracks_header_title}>Список треков</div>
						<AiOutlineDown className={s.tracks_header_icon} />
					</AccordionToggle>
					<AccordionContent className={s.tracks}>
						{playlist.tracks.map((path, key) => <TrackItem key={key} path={path} selected={isPlaying && selected && selectedTrack === key} onClickPlay={handleTrackChange(key)} onPause={onPause} />)}
					</AccordionContent>
				</Accordion>
			</div>
		</div>
	)
}