import { routes } from "../../../routes/routes"
import { NavLink } from "react-router"
import s from './Menu.module.scss'

export const Menu = () => {
	return (
		<ul className={s.menu}>
			{Object.values(routes).filter(({hideMenu}) => {return !hideMenu}).map(({path, title}) => (
				<li className={s.item} key={path}>
					<NavLink className={s.link} to={path} end>{title}</NavLink>
				</li>
			))}
		</ul>
	)
}