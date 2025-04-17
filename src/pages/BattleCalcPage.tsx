import { useOutletContext } from "react-router"
import { routes } from "../routes/routes"
import { useEffect } from "react"
import { SetTitleType } from "../types/types"
import { BattleCalc } from "../components/BattleCalc/BattleCalc"

export const BattleCalcPage = () => {
	const { setTitle } = useOutletContext<SetTitleType>();
	
	useEffect(() => {
		setTitle?.(routes.battle_calc.title)
	}, [setTitle])

	return (
		<BattleCalc />
	)
}