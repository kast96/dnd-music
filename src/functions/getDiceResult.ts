import { DiceFaces } from "../types/types";

export const getDiceResult = (diceFaces: DiceFaces) => {
	return Math.floor(Math.random() * diceFaces) + 1;
}