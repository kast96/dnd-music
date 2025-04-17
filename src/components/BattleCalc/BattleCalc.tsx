import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import s from './BattleCalc.module.scss'
import { Players } from "./Players/Players"
import { BattleCalcInputsType } from "../../types/types"

export const BattleCalc = () => {
	const playersDefaultValues = {
		hp: 0,
		armor: 0
	}

	const { register, handleSubmit, control } = useForm<BattleCalcInputsType>({
		defaultValues: {
			players: [playersDefaultValues]
		}
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'players'
	})

	const addPlayer = () => {
		append(playersDefaultValues)
	}

	const onSubmit: SubmitHandler<BattleCalcInputsType> = (data) => {
		console.log(data)
	}
	
	return (
		<div className={s.container}>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<h2 className={s.title}>Игроки</h2>
				<Players 
					register={register} 
					players={fields} 
					addPlayer={addPlayer} 
					removePlayer={remove} 
				/>
				<input type="submit" />
			</form>
		</div>
	)
}