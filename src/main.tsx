import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext'
import App from './App'
import Landing from '@/pages/Landing'
import Onboarding from '@/pages/Onboarding'
import DashboardHome from '@/pages/DashboardHome'
import Chat from '@/pages/Chat'
import Settings from '@/pages/Settings'
import Personas from '@/pages/Personas'
import Creative from '@/pages/Creative'
import Surveys from '@/pages/Surveys'
import Dashboard from '@/pages/Dashboard'
import Profitability from '@/pages/Profitability'
import ProfitImpacts from '@/pages/ProfitImpacts'
import LTVWaterfall from '@/pages/LTVWaterfall'
import Exports from '@/pages/Exports'
import Inputs from '@/pages/Inputs'
import { getBasePath } from '@/lib/utils'

const basePath = getBasePath()

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <Landing /> },
			{ path: 'onboarding', element: <Onboarding /> },
			{ path: 'dashboard', element: <DashboardHome /> },
			{ path: 'chat', element: <Chat /> },
			{ path: 'dashboard/reports', element: <Dashboard /> },
			{ path: 'dashboard/customer', element: <Dashboard /> },
			{ path: 'dashboard/merchandise', element: <Dashboard /> },
			{ path: 'dashboard/site', element: <Dashboard /> },
			{ path: 'dashboard/competitors', element: <Dashboard /> },
			{ path: 'dashboard/profitability', element: <Profitability /> },
			{ path: 'dashboard/profit-impacts', element: <ProfitImpacts /> },
			{ path: 'dashboard/ltv-waterfall', element: <LTVWaterfall /> },
			{ path: 'settings', element: <Settings /> },
			{ path: 'personas', element: <Personas /> },
			{ path: 'creative', element: <Creative /> },
			{ path: 'surveys', element: <Surveys /> },
			{ path: 'exports', element: <Exports /> },
			{ path: 'inputs', element: <Inputs /> },
		],
	},
], {
	basename: basePath || '/',
})

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	</StrictMode>,
)
