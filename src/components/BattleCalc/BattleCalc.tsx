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

	const result = calcBattle(watch())
	
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
				<div className={s.total}>
					<div className={s.total_wins}>Побед/Поражений: {result.winCount}/{result.defeatCount}</div>
					<div className={s.total_precent}>Процент на победу: {Math.round(result.winCount / (result.winCount + result.defeatCount) * 100)}%</div>
					<div className={s.total_hp}>Среднее HP игроков: {result.playersStartHp} - {Math.round(result.playersStartHp - result.playersHp)} = {Math.round(result.playersHp)}</div>
					<div className={s.total_hp}>Среднее HP врагов: {result.enemiesStartHp} - {Math.round(result.enemiesStartHp - result.enemiesHp)} = {Math.round(result.enemiesHp)}</div>
				</div>
			)}
		</div>
	)
}