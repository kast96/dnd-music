import { BattleCalcInputsType } from "../types/types"
import { getDiceResult } from "./getDiceResult"

export const calcBattle = ({ players, enemies }: BattleCalcInputsType) => {
	var fighters = {
		players: [...players],
		enemies: [...enemies]
	}

	const initiatives = (Object.keys(fighters) as Array<keyof typeof fighters>).flatMap(type => 
		fighters[type].map((fighter, index) => ({
			type,
			index,
			initiative: getDiceResult(20) + (+fighter.initiative || 0)
		}))
	).sort((a, b) => b.initiative - a.initiative)

	var initiativeLogs = initiatives.map(initiative => fighters[initiative.type][initiative.index].name + ' - ' + initiative.initiative)
	console.log('Инициатива:', initiativeLogs.join(','))

	for (let i = 0; i < initiatives.length; i++) {
		const initiative = initiatives[i];
		const fighter = fighters[initiative.type][initiative.index];

		[fighter.attack1, fighter.attack2].forEach(damage => {
			const isPlayer = initiative.type == 'players';
			const attacedFighter = fighters[isPlayer ? 'enemies' : 'players'].reduce((prev, fighter) => {
				if (fighter.hp <= 0) return prev;

				return isPlayer ? (fighter.hp < prev.hp ? fighter : prev) : (fighter.hp > prev.hp ? fighter : prev)
			})

			console.log(fighter.name, 'атакует', attacedFighter.name, 'оружием', damage)
			
			let attackResult = getDiceResult(20) + (fighter.strength || 0)
			if (attackResult < attacedFighter.armor) {
				console.log(attackResult, '<', attacedFighter.armor, '- промах')
				return
			}

			console.log(attackResult, '>=', attacedFighter.armor, '- попадание')

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

			console.log('Урон:', damageResult)
			
			if (!damageResult) return;

			console.log('Здоровье: ', attacedFighter.hp, '-', damageResult, '=', attacedFighter.hp - damageResult)
			
			attacedFighter.hp -= damageResult
			if (attacedFighter.hp < 0) attacedFighter.hp = 0
		})
	}

	return fighters
}