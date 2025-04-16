import { useOutletContext } from "react-router"
import { routes } from "../routes/routes"
import { useEffect } from "react"
import { SetTitleType } from "../types/types"
import { IndexMenu } from "../components/IndexMenu/IndexMenu"

export const IndexPage = () => {
	const { setTitle } = useOutletContext<SetTitleType>();
	
	useEffect(() => {
		setTitle?.(routes.index.title)
	}, [setTitle])

	return (
		<IndexMenu />
	)
}