import { SubmitHandler, useForm } from "react-hook-form"
import s from './BattleCalc.module.scss'
import { Players } from "./Players/Players"
import { BattleCalcInputsType, BattleCalcPalyerType } from "../../types/types"
import { useState } from "react"

export const BattleCalc = () => {
	const { register, handleSubmit, watch } = useForm<BattleCalcInputsType>()

	const [players, setPayers] = useState<Array<BattleCalcPalyerType>>([{
		hp: 0,
		armor: 0,
	}])

	const addPlayer = () => {
		setPayers(players => [
			...players,
			{
				hp: 0,
				armor: 0,
			}
		])
	}

	const removePlayer = (index: number) => () => {
		setPayers(players => players.filter((_, key) => key !== index))
	}

	const onSubmit: SubmitHandler<BattleCalcInputsType> = (data) => {
		console.log(data)
	}

	watch(({players}) => {
		if (players instanceof Array)
		{
			setPayers(players.map(player => ({
				hp: player?.hp || 0,
				armor: player?.armor || 0
			})))
		}
	})

	console.log(players);
	
	
	return (
		<div className={s.container}>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<h2 className={s.title}>Игроки</h2>
				<Players register={register} players={players} addPlayer={addPlayer} removePlayer={removePlayer} />
				<input type="submit" />
			</form>
		</div>
	)
}