import React, { FC, useState } from 'react'
import Header from './Header'
import Desc from './Desc' 

const App: FC = () => {
    const [random, setRandom] = useState(0)
    const getDesc = () => {
        setRandom(Math.floor(Math.random() * (5 - 1 + 1) + 1))
    }
    return (
        <>
            <Header getNum={getDesc}/>
            <Desc num={random} getNum={getDesc}/>
        </>
    )
}
export default App