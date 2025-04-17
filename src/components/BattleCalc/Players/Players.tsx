import { FC, useState } from 'react'
import { Player } from './Player/Player'
import s from './Players.module.scss'
import { BattleCalcInputsType, BattleCalcPalyerType } from '../../../types/types'
import { UseFormRegister } from 'react-hook-form'

type PropsType = {
	register: UseFormRegister<BattleCalcInputsType>
	players: Array<BattleCalcPalyerType>
	addPlayer: () => void
	removePlayer: (index: number) => () => void
}

export const Players: FC<PropsType> = ({register, players, addPlayer, removePlayer}) => {
	return (
		<div className={s.container}>
			{players.map((player, key) => <Player register={register} key={key} index={key} remove={removePlayer(key)} player={player} />)}
			<button className={s.add} onClick={addPlayer}>+</button>
		</div>
	)
}