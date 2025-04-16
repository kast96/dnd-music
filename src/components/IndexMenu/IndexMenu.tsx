import { NavLink } from "react-router"
import s from './IndexMenu.module.scss'
import { routes } from "../../routes/routes"

export const IndexMenu = () => {
	return (
		<ul className={s.menu}>
			{Object.values(routes).filter(({hideMenu}) => {return !hideMenu}).map(({path, title, menuImage}) => (
				<li className={s.item} key={path}>
					{menuImage &&	<img className={s.img} src={menuImage} alt={title} />}
					<NavLink className={s.link} to={path} key={path} end>{title}</NavLink>
				</li>
			))}
		</ul>
	)
}