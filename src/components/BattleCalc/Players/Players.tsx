import { FC, useState } from 'react'
import { Player } from './Player/Player'
import s from './Players.module.scss'
import { BattleCalcInputsType, BattleCalcPalyerType } from '../../../types/types'
import { UseFormRegister } from 'react-hook-form'

type PropsType = {
	register: UseFormRegister<BattleCalcInputsType>
	players: Array<BattleCalcPalyerType>
	addPlayer: () => void
	removePlayer: (index: number) => void
}

export const Players: FC<PropsType> = ({register, players, addPlayer, removePlayer}) => {
	return (
		<div className={s.container}>
			{players.map((_, index) => (
				<Player 
					register={register} 
					key={index} 
					index={index} 
					remove={() => removePlayer(index)} 
				/>
			))}
			<button className={s.add} onClick={addPlayer}>+</button>
		</div>
	)
}