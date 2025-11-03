import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext'
import App from './App'
import Landing from '@/pages/Landing'
import Settings from '@/pages/Settings'
import Personas from '@/pages/Personas'
import Creative from '@/pages/Creative'
import Dashboard from '@/pages/Dashboard'
import Exports from '@/pages/Exports'
import Admin from '@/pages/Admin'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <Landing /> },
			{ path: 'settings', element: <Settings /> },
			{ path: 'personas', element: <Personas /> },
			{ path: 'creative', element: <Creative /> },
			{ path: 'dashboard', element: <Dashboard /> },
			{ path: 'dashboard/customer', element: <Dashboard /> },
			{ path: 'dashboard/merchandise', element: <Dashboard /> },
			{ path: 'dashboard/site', element: <Dashboard /> },
			{ path: 'dashboard/competitors', element: <Dashboard /> },
			{ path: 'exports', element: <Exports /> },
			{ path: 'admin', element: <Admin /> },
		],
	},
], {
	basename: '/ben-macpherson',
})

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	</StrictMode>,
)
