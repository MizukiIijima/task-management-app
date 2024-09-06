import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'

function App() {

    const [isLogin, setIsLogin] = useState(false);

    return (
        <>
            <Header></Header>
        </>
    )
}

export default App
