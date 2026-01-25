import './App.css'
import Content from './components/Content.tsx'
import Header from './components/header/Header.tsx'
import HeardleContext from './context/HeardleContext.tsx'

const App = () => {

    return (
        <HeardleContext>
            <main className='main'>
                <Header />
                <Content />
            </main>
        </HeardleContext>
    )
}

export default App
