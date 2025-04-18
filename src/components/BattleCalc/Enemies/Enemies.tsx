import { FC } from 'react'
import { Enemy } from './Enemy/Enemy'
import s from './Enemies.module.scss'
import { BattleCalcInputsType, FighterCalcPlayerType } from '../../../types/types'
import { UseFormRegister } from 'react-hook-form'

type PropsType = {
	register: UseFormRegister<BattleCalcInputsType>
	enemies: Array<FighterCalcPlayerType>
	add: () => void
	remove: (index: number) => void
}

export const Enemies: FC<PropsType> = ({register, enemies, add, remove}) => {
	return (
		<div className={s.container}>
			{enemies.map((_, index) => (
				<Enemy 
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