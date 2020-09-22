import React, {Component} from 'react'
import Main from '../template/main'
import axios from 'axios'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Alterar, Excluir e Listar' 
}

//Criando a função de limpar os dados dos campos digitados
const baseUrl = 'http://localhost:3001/users'
const estadoInicial = {
    user: {name: '', email: '' },
    list: []
}



export default class userCrud extends Component{
    
    state = {...estadoInicial}

    componentWillMount(){
        axios(baseUrl).then(resp => this.setState({list: resp.data}))
    }
    
    clear(){
        this.setState({user: estadoInicial.user})
    }

    save(){
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl

        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({user: estadoInicial.user, list})
            })
    }

    getUpdateList(user, add = true){
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    updateCampo(event){
        //clonoando o usuario antes dele ser alterado
        const user = { ...this.state.user }

        user[event.target.name] = event.target.value
        this.setState({user})
    }

    renderFormulario(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name = "name"
                                value = {this.state.user.name} 
                                onChange = {i => this.updateCampo(i)}
                                placeholder = "Digite seu nome..." />
                        </div>
                    </div>

                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control"
                        name = "email"
                        value = {this.state.user.email}
                        onChange = {i => this.updateCampo(i)}
                        placeholder = "Digite seu email" />
                    </div>
                </div>
             </div>

             <hr />
             <div className="row">
                 <div className="col-12 d-flex justify-content-end">
                     <button className="btn btn-primary mr-2" onClick = {e => this.clear(e)}>
                         Limpar
                     </button>
                     
                     <button className="btn btn-primary" onClick = {e => this.save(e)}>
                         Salvar
                     </button>

                     
                 </div>
             </div>
        </div>
        )
    }

    load(user){
        this.setState({user})
    }

    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
        const list = this.getUpdateList(user, false)
        this.setState({list})
        })
    }

    renderTabele(){
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th className = "mr-6">Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(user => {
            return(
                <tr key = {user.id}>
                    <td className="mr-10">{user.name}</td>
                    <td className="mr-10">{user.email}</td>
                    <td>
                        <button className = "btn btn-warning" onClick = {() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>

                        <button className="btn btn-danger ml-2" onClick = {() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render(){
        return(
            <Main {...headerProps}>
               {this.renderFormulario()}
               {this.renderTabele()}
            </Main>
        )
    }
}