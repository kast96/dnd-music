import { BattleCalcInputsType, FighterCalcPlayerType } from "../types/types"
import { getDiceResult } from "./getDiceResult"

export const calcBattle = ({ players, enemies }: BattleCalcInputsType, simulationCount: number) => {
	let result = {
		playersStartHp: getFighterSumHp(players),
		enemiesStartHp: getFighterSumHp(enemies),
		playersHp: 0,
		enemiesHp: 0,
		winCount: 0,
		defeatCount: 0,
	}

	for (let simulationIndex = 0; simulationIndex < simulationCount; simulationIndex++) {
		let isFinish = false

		let fighters = {
			players: players.flatMap(({ count, ...fighter }) => 
				Array.from({ length: count === undefined || count < 1 ? 1 : count }, () => ({ ...fighter }))
			),
			enemies: enemies.flatMap(({ count, ...fighter }) => 
				Array.from({ length: count === undefined || count < 1 ? 1 : count }, () => ({ ...fighter }))
			)
		}

		const initiatives = (Object.keys(fighters) as Array<keyof typeof fighters>).flatMap(type => 
			fighters[type].map((fighter, index) => ({
				type,
				index,
				initiative: getDiceResult(20) + (+fighter.initiative || 0)
			}))
		).sort((a, b) => b.initiative - a.initiative)

		//let initiativeLogs = initiatives.map(initiative => fighters[initiative.type][initiative.index].name + ' - ' + initiative.initiative)
		//console.log('Инициатива:', initiativeLogs.join(', '))
		
		let maxIteration = 1000;
		while (!isFinish && maxIteration--) {
			for (let i = 0; i < initiatives.length; i++) {
				if (isFinish) break

				const initiative = initiatives[i];
				const fighter = fighters[initiative.type][initiative.index];

				if (fighter.hp <= 0) continue;

				[fighter.attack1, fighter.attack2].forEach(damage => {
					if (!damage) return
					if (isFinish) return

					const isPlayer = initiative.type == 'players'
					const availableFighters = fighters[isPlayer ? 'enemies' : 'players'].filter(fighter => fighter.hp > 0)
					const attackedFighter = availableFighters.length > 1 ? availableFighters.reduce((prev, fighter) => {
						if (fighter.hp <= 0) return prev

						return isPlayer ? (fighter.hp < prev.hp ? fighter : prev) : (fighter.hp > prev.hp ? fighter : prev)
					}) : availableFighters.shift();

					if (!attackedFighter || attackedFighter.hp <= 0)
					{
						isFinish = true
						return
					}

					//console.log(fighter.name, 'атакует', attacedFighter.name, 'оружием', damage)
					
					let attackResult = getDiceResult(20) + (fighter.strength || 0)
					if (attackResult < attackedFighter.armor) {
						//console.log(attackResult, '<', attacedFighter.armor, '- промах')
						return
					}

					//console.log(attackResult, '>=', attacedFighter.armor, '- попадание')

					let damageResult = 0
					let index = damage?.indexOf('d')
					
					if (index && index >= 0) {
						let countDice = +(damage?.slice(0, index) || '')
						let diceFaces = +(damage?.slice(index + 1) || '')

						if (countDice < 1) return

						for (let indexDice = 0; indexDice < countDice; indexDice++) {		
							damageResult += getDiceResult(diceFaces)
						}
					} else { 
						damageResult += +(damage || 0)
					}

					//console.log('Урон:', damageResult)
					
					if (!damageResult) return;

					//console.log('Здоровье: ', attacedFighter.hp, '-', damageResult, '=', attacedFighter.hp - damageResult)
					
					attackedFighter.hp -= damageResult
					if (attackedFighter.hp < 0) attackedFighter.hp = 0
				})
			}
		}

		let playersHp = getFighterSumHp(fighters.players)
		let enemiesHp = getFighterSumHp(fighters.enemies)
		
		result.playersHp = simulationIndex ? (result.playersHp + playersHp) / 2 : playersHp
		result.enemiesHp = simulationIndex ? (result.enemiesHp + enemiesHp) / 2 : enemiesHp
		
		if (enemiesHp <= 0) result.winCount++
		if (playersHp <= 0) result.defeatCount++
	}

	return result
}

const getFighterSumHp = (fighters: Array<FighterCalcPlayerType>) => {
	return fighters.reduce((sum, fighter) => sum + fighter.hp, 0)
}