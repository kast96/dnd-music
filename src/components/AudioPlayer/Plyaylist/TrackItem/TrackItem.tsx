import { AiFillPlayCircle, AiOutlinePauseCircle } from "react-icons/ai"
import s from './TrackItem.module.scss'
import { getFileNameFromPath } from "../../../../functions/getFileNameFromPath"

type PropsType = {
	path: string
	selected: boolean
	onClickPlay: () => void
	onPause: () => void
}

export const TrackItem: React.FC<PropsType> = ({path, selected, onClickPlay, onPause}) => {
	return (
		<div className={s.container}>
			<div className={s.button} onClick={selected ? onPause : onClickPlay}>
				{!selected &&	<AiFillPlayCircle className={s.icon} />}
				{selected && <AiOutlinePauseCircle className={s.icon} />}
			</div>
			<div className={s.name}>{getFileNameFromPath(path)}</div>
		</div>
	)
}