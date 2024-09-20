import React, { FC, useState, useRef, useEffect } from 'react'
import { descriptions } from './descriptions.ts'

interface Props {
    num: number,
    getNum: () => void
}

const Desc: FC<Props> = ({ num, getNum }) => {
    const form = useRef<HTMLFormElement | null>(null)
    useEffect(() => {
        setValueParagraf(descriptions[num])
        console.log('reset')
        setCountTime(0)
        setD('')
    }, [num])
    const [valueParagraf, setValueParagraf] = useState<string>('')
    const [active, setActive] = useState<boolean>(true)
    const [valueText, setValueText] = useState<string>('')
    const [blocking, setBlocking] = useState<number>(-1)
    const [countTime, setCountTime] = useState<number>(0)
    useEffect(() => { 
        const time = setInterval(() => {
            setCountTime(prev => prev + 1)
        }, 1000)
    }, [])
    const descriptionContent = useRef<null | HTMLDivElement>(null)
    let [error, setError] = useState<number>(0)
    const [d, setD] = useState('')
    const [complete, setComplete] = useState<boolean>(false)
    const [countTimeValue, setCountTimeValue] = useState<number>(0)
    return (
        <section className="description">
            <div className="description-container">
                <div ref={descriptionContent} className={complete ? "description-content active-desc" : "description-content"}>
                    <form ref={form}>
                        <input type="text" maxLength={blocking} value={d && d} onChange={(e) => {
                            console.log(e.target.value)
                            if (e.target.value[e.target.value.length - 1] === valueParagraf[e.target.value.length - 1]) {
                                setActive(true)
                                setD(e.target.value)
                                setBlocking(-1)
                                // console.log(e.target.value[e.target.value.length - 1], valueParagraf[e.target.value.length - 1])
                                if (e.target.value == valueParagraf) {
                                    setComplete(true)
                                    setCountTimeValue(countTime)
                                    // clearInterval(time)
                                    console.log(`
                                        
    Молодец! 
    Результат : ${(100 - (error / valueParagraf.length) * 100)}%
    
    Количество ошибок : ${error}
    
    Время : ${countTime} секунд.
    
                                        `)
                                }
                            }
                            else {
                                setError(error + 1)
                                setActive(false)
                                setD(e.target.value.slice(0, -1))
                                setBlocking(e.target.value.length)
                            }
                        }}/>
                    </form>

                    <p>{valueParagraf}</p>
                    <div className={active ? "description-container__warning" : "description-container__warning active"}></div>
                </div>
                {
                    complete &&
                        <div className="description-content__complete-game-background" style={{width: `${descriptionContent.current?.clientWidth}px`, height: `${descriptionContent.current?.clientHeight}px`}}>
                            <div className="description-content__complete-game">
                                <div className="description-content__complete-game--info">
                                    <h1>Время : {countTimeValue} Секунд</h1>
                                    <h1 id="errors">{error} Ошибок</h1>
                                    <h1>Результат : {(100 - (error / valueParagraf.length) * 100).toFixed(0)}%</h1>
                                    <button className="btn btn-info btn-sm" onClick={() => {getNum(); setComplete(false)}}>Сгенерировать Новый Текст</button>
                                </div>
                                <div className="button-disabled"></div>
                            </div>
                        </div>
                    }
            </div>
        </section>
    )
}
export default Desc