import { useFieldArray, useForm } from "react-hook-form"
import s from './BattleCalc.module.scss'
import { Players } from "./Players/Players"
import { BattleCalcInputsType } from "../../types/types"
import { Enemies } from "./Enemies/Enemies"
import { calcBattle } from "../../functions/calcBattle"

export const BattleCalc = () => {
	const defaultValues = {
		players: {
			hp: 0,
			armor: 0,
			initiative: 0
		},
		enemies: {
			hp: 0,
			armor: 0,
			initiative: 0
		}
	}

	const { register, control, watch, handleSubmit } = useForm<BattleCalcInputsType>({
		defaultValues: {
			players: [defaultValues.players],
			enemies: [defaultValues.enemies]
		}
	})

	const { fields: playerFields, append: playerAppend, remove: playerRemove } = useFieldArray({ control, name: 'players' })
	const { fields: enemyFields, append: enemyAppend, remove: enemyRemove } = useFieldArray({ control, name: 'enemies' })

	const addPlayer = () => {
		playerAppend(defaultValues.players)
	}

	const addEnemy = () => {
		enemyAppend(defaultValues.enemies)
	}

	const result = calcBattle(watch(), 1000)
	
	return (
		<div className={s.container}>
			<form className={s.form} onSubmit={handleSubmit(() => false)}>
				<div className={s.block}>
					<h2 className={s.title}>Игроки</h2>
					<Players 
						register={register} 
						players={playerFields} 
						add={addPlayer} 
						remove={playerRemove} 
					/>
				</div>
				<div className={s.block}>
					<h2 className={s.title}>Враги</h2>
					<Enemies
						register={register} 
						enemies={enemyFields} 
						add={addEnemy} 
						remove={enemyRemove} 
					/>
				</div>
			</form>
			{result && (
				<div className={s.block}>
					<h2 className={s.title}>Результат симуляции боев</h2>
					<div className={s.total}>
						<div className={s.total_property}>
							<span className={s.total_property_name}>Побед/Поражений:</span>
							<span className={s.total_property_value}>{result.winCount}/{result.defeatCount}</span>
						</div>
						<div className={s.total_property}>
							<span className={s.total_property_name}>Процент побед:</span>
							<span className={s.total_property_value}>{Math.round(result.winCount / (result.winCount + result.defeatCount) * 100)}%</span>
						</div>
						<div className={s.total_property}>
							<span className={s.total_property_name}>Среднее оставщееся HP игроков:</span>
							<span className={s.total_property_value}>{Math.round(result.playersHp)}</span>
						</div>
						<div className={s.total_property}>
							<span className={s.total_property_name}>Среднее оставщееся HP врагов:</span>
							<span className={s.total_property_value}>{Math.round(result.enemiesHp)}</span>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}