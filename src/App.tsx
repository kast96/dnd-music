import { RouterProvider, createBrowserRouter } from "react-router"
import { routes } from './routes/routes'
import { MainLayout } from './layouts/MainLayout'

export const App = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			Component: MainLayout,
			children: Object.values(routes).map(({ path, Component }) => ({
				path,
				Component,
			}))
		}
	])

	return (
		<RouterProvider router={router} />
	)
}