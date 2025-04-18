import { BattleCalcInputsType } from "../types/types";
import { getDiceResult } from "./getDiceResult";

export const calcBattle = ({ players, enemies }: BattleCalcInputsType) => {
	const initiatives = [
		...players.map((player, index) => ({
			type: 'player',
			index,
			initiative: getDiceResult(20) + (+player.initiative || 0)
		})),
		...enemies.map((enemy, index) => ({
			type: 'enemy',
			index,
			initiative: getDiceResult(20) + (+enemy.initiative || 0)
		}))
	].sort((a, b) => a.initiative < b.initiative ? 1 : -1)

	return initiatives
}