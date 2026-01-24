import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './config/i18n/i18n.ts'
import App from './App.tsx'
import { Chart as ChartJS, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js'
import { RouteProvider } from './config/router.ts'

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouteProvider>
            <App />
        </RouteProvider>
    </StrictMode>
)
