import s from './Player.module.scss'
import { UseFormRegister } from 'react-hook-form'
import { BattleCalcInputsType, BattleCalcPalyerType } from '../../../../types/types'
import { FaHeart, FaShield } from 'react-icons/fa6'
import { FC } from 'react'
import { characteristics } from '../../../../data/characteristics'

type PropsType = {
	register: UseFormRegister<BattleCalcInputsType>
	index: number
	remove: () => void
}

export const Player: FC<PropsType> = ({register, index, remove}) => {
	return (
		<div className={s.container}>
			<input className={[s.name, 'input input-border'].join(' ')} {...register(`players.${index}.name`)} placeholder='Имя' />
			<div className={s.header}>
				<div className={s.header_item}>
					<FaHeart className={s.header_icon} />
					<input className={[s.header_input, 'input'].join(' ')} {...register(`players.${index}.hp`, { required: true, min: 1 })} placeholder='0' />
				</div>
				<div className={s.header_item}>
					<FaShield className={s.header_icon} />
					<input className={[s.header_input, 'input'].join(' ')} {...register(`players.${index}.armor`, { required: true, min: 1 })} placeholder='0' />
				</div>
			</div>
			<div className={s.characteristics}>
				{characteristics.map(characteristic => (
					<div className={s.characteristic}>
						<span className={s.characteristic_name}>{characteristic.name}</span>
						<input className={[s.characteristic_input, 'input input-border'].join(' ')} {...register(`players.${index}.${characteristic.id}`, { required: true, min: 1 })} placeholder='0' />
					</div>
				))}
			</div>
			<div className={s.remove} onClick={remove}>Удалить</div>
		</div>
	)
}