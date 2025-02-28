import { PlaylistType } from "../../../types/types"
import { TrackItem } from "./TrackItem/TrackItem"
import { AiFillPlayCircle, AiFillPauseCircle, AiOutlineDown } from "react-icons/ai"
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
		<div className={s.container}>
			<div className={s.title}>{playlist.name}{selected ? ' - Выбран' : ''}</div>
			<div className={s.image} onClick={isPlayingPlaylist ? onPause : onChangePlayList}>
				{playlist.image && (
					<img className={s.picture} src={playlist.image} alt={playlist.name} />
				)}
				{!isPlayingPlaylist && <AiFillPlayCircle className={s.icon} />}
				{isPlayingPlaylist && <AiFillPauseCircle className={s.icon} />}
			</div>
			<Accordion className={s.tracks_container}>
        <AccordionToggle className={s.tracks_header}>
					<div className={s.tracks_header_title}>Треки</div>
					<AiOutlineDown className={s.tracks_header_icon} />
				</AccordionToggle>
        <AccordionContent className={s.tracks}>
					{playlist.tracks.map((path, key) => <TrackItem key={key} path={path} selected={isPlaying && selected && selectedTrack === key} onClickPlay={handleTrackChange(key)} onPause={onPause} />)}
				</AccordionContent>
      </Accordion>
		</div>
	)
}