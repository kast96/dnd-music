import s from './Player.module.scss'
import { UseFormRegister } from 'react-hook-form'
import { BattleCalcInputsType, BattleCalcPalyerType } from '../../../../types/types'
import { FaHeart, FaShield } from 'react-icons/fa6'
import { FC } from 'react'

type PropsType = {
	register: UseFormRegister<BattleCalcInputsType>
	index: number
	player: BattleCalcPalyerType
	remove: () => void
}

export const Player: FC<PropsType> = ({register, index, player, remove}) => {
	return (
		<div className={s.container}>
			<div className={s.header}>
				{player.hp}
				<div className={s.header_item}>
					<FaHeart className={s.header_icon} />
					<input className={s.header_input} {...register(`players.${index}.hp`, { required: true, min: 1 })} placeholder='0' defaultValue={player.hp} />
				</div>
				<div className={s.header_item}>
					<FaShield className={s.header_icon} />
					<input className={s.header_input} {...register(`players.${index}.armor`, { required: true, min: 1 })} placeholder='0' defaultValue={player.armor} />
				</div>
			</div>
			<div className={s.characteristics}>characteristics</div>
			<div className={s.remove} onClick={remove}>Удалить</div>
		</div>
	)
}