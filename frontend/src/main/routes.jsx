import React from 'react'
import {Switch, Route, Redirect} from 'react-router'
import Home from '../components/home/home'
import UserCrud from '../components/user/userCrud'

/*Switch é o escolha
//O Route é o responsavel pela navegação das paginas
No redirect esta dizendo que caso ele digite qlqr outra url que não seja as 
informadas ele vai para a home
*/
export default props =>
    <Switch>
        <Route exact path = '/' component = {Home}>
            
        </Route>

        <Route path = '/users' component = {UserCrud}>

        </Route>
        
        <Redirect from = '*' to = '/' />
    </Switch>