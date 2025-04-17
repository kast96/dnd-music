import { IndexPage } from "../pages/IndexPage";
import { MusicPage } from "../pages/MusicPage";
import { BattleCalcPage } from "../pages/BattleCalcPage";
import { RoutersType } from "../types/types";
import menuImageMusic from "../images/menu/music.png"
import menuImageBattleCalc from "../images/menu/battle_calc.png"

export const routes = {
	index: {
		path: '/',
		title: 'Главная',
		Component: IndexPage,
		hideMenu: true,
	},
	music: {
		path: '/music',
		title: 'Музыка',
		Component: MusicPage,
		menuImage: menuImageMusic,
	},
	battle_calc: {
		path: '/battle-calc',
		title: 'Калькулятор сражений',
		Component: BattleCalcPage,
		menuImage: menuImageBattleCalc,
	},
} as RoutersType