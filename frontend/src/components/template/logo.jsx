import './logo.css'
import React from 'react'
import Logo from '../../assets/imgs/logo_NSilva_transparente_atualizadoo.png'
import {Link} from 'react-router-dom'

export default props => 
    <aside className = "logo">
        <Link to ="/" className="logo">
            <img src={Logo} alt="Logo N. Silva"/>
        </Link>
    </aside>