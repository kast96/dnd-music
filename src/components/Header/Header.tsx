import { FC } from "react"
import s from './Header.module.scss'
import { Menu } from "./Menu/Menu"
import { NavLink } from "react-router"
import { routes } from "../../routes/routes"

type PropsType = {
	title: string
}

export const Header: FC<PropsType> = ({}) => {
	return (
		<header className={s.header}>
			<div className={s.logo}>
				{/*
				<h1 className={s.h1}>{title}</h1>
				*/}
				<NavLink className={s.h1} to={routes.index.path} end>DnD Tools</NavLink>
			</div>
			<Menu />
		</header>
	)
}