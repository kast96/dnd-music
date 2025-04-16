import { useState } from "react"
import { Outlet } from "react-router"
import { Header } from "../components/Header/Header"

export const MainLayout = () => {
	const [title, setTitle] = useState('')

	return (
		<>
			<Header title={title} />
			<div className="wrapper">
				<Outlet context={{ setTitle }} />
			</div>
		</>
	)
}