import { FC } from 'react'
import { Player } from './Player/Player'
import s from './Players.module.scss'
import { BattleCalcInputsType, FighterCalcPlayerType } from '../../../types/types'
import { UseFormRegister } from 'react-hook-form'

type PropsType = {
	register: UseFormRegister<BattleCalcInputsType>
	players: Array<FighterCalcPlayerType>
	add: () => void
	remove: (index: number) => void
}

export const Players: FC<PropsType> = ({register, players, add, remove}) => {
	return (
		<div className={s.container}>
			{players.map((_, index) => (
				<Player
					register={register}
					key={index}
					index={index}
					remove={() => remove(index)}
				/>
			))}
			<button className={s.add} onClick={add}>+</button>
		</div>
	)
}