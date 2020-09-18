import './logo.css'
import React from 'react'
import Logo from '../../assets/imgs/logo_NSilva_transparente_atualizadoo.png'

export default props => 
    <aside className = "logo">
        <a href="/" className="logo">
            <img src={Logo} alt="Logo N. Silva"/>
        </a>
    </aside>