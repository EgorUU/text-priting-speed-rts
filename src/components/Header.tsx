import React, { FC, useState } from 'react'

interface Props {
    getNum: () => void
}

const Header: FC<Props> = ({ getNum }) => {
    return (
        <header className="header">
            <div className="header-container">
                <button className="header-button" onClick={() => getNum()}>Сгенерировать Новый Текст</button>
            </div>
        </header>
    )
}
export default Header