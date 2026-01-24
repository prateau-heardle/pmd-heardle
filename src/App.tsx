import './App.css'
import Content from './components/Content.tsx'
import Header from './components/header/Header.tsx'
import { ROUTES, routes, useRoute } from './config/router.ts'
import HeardleContext from './context/HeardleContext.tsx'

const App = () => {
    const route = useRoute()

    if (!route.name) {
        routes[ROUTES.DAILY]().replace()
    }

    // TODO redirection vers le mode infini
    return (
        <HeardleContext>
            <main className='main'>
                <a {...routes[ROUTES.DAILY]().link}>Daily</a>
                <a {...routes[ROUTES.INFINITE]().link}>Infinity</a>
                <Header />
                <Content />
            </main>
        </HeardleContext>
    )
}

export default App
