import React, { FC, useState } from 'react'

interface Props {
    getNum: () => void
}

const Header: FC<Props> = ({ getNum }) => {
    return (
        <header className="header">
            <div className="header-container">
                <button className="btn btn-warning btn-sm" onClick={() => getNum()}>Сгенерировать Новый Текст</button>
            </div>
        </header>
    )
}
export default Header