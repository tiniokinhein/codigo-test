import React, { Component } from 'react'
import { signIn } from '../auth/AuthLogin'

export default class LogIn extends Component {

    state = {
        error: null,
        email: '',
        password: '',
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    async handleSubmit(e) {
        e.preventDefault()
        this.setState({ error: '' })
        try {
            await signIn(this.state.email , this.state.password)
        } catch(error) {
            this.setState({
                error: error.message
            })
        }
    }

    render() {
        return (
            <div
                className="d-table w-100 bg-dark"
                style={{
                    height: '100vh',
                    minHeight: '600px'
                }}
            >
                <div 
                    className="d-table-cell align-middle"
                >
                    <div 
                        className="col-12 col-md-6 col-lg-3 mx-auto"
                    >
                        <form
                            onSubmit={this.handleSubmit.bind(this)}
                            className="py-5 px-5 bg-white"
                        >
                            <h4
                                className="text-center mb-5 pb-4 text-secondary"
                            >
                                Member Login
                            </h4>
                            <div 
                                className="field-group mb-4"
                            >
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.handleChange.bind(this)}
                                    className="form-control border-top-0 border-right-0 border-left-0 rounded-0 pl-0 shadow-none"
                                />
                            </div>
                            <div 
                                className="field-group mb-5 pb-3"
                            >
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleChange.bind(this)}
                                    className="form-control border-top-0 border-right-0 border-left-0 rounded-0 pl-0 shadow-none"
                                />
                            </div>
                            <div 
                                className="field-group text-center"
                            >
                                {
                                    this.state.error ? <p className="text-danger">{this.state.error}</p> : null
                                }
                                <button
                                    className="btn px-4 rounded-0 text-uppercase text-white shadow-none"
                                    style={{
                                        background: '#3f3a5f'
                                    }}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
