import React, {Component} from "react";
import {Dropdown} from 'react-bootstrap';
import {FaUserAlt, FaLock} from 'react-icons/fa';
import Joi from 'joi-browser';
import http from '../services/httpServices';
import global from "../services/data";

export default class Login extends Component {

    state = {
        language: 'EN',
        account: {
            username: '',
            password: ''
        },
        error: {
            username: '',
            password: '',
            server: ''
        }
    }

    styles = {
        main: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '99vh',
            backgroundColor: '#2d302e'
        },
        form: {
            backgroundColor: '#EFF1F9',
            padding: 20,
            borderRadius: 25,
            width: '50%',
            alignSelf: 'center',
            opacity: 0.85,
        },
        input: {
            fontSize: 20,
            borderBottomRightRadius: 15,
            borderTopRightRadius: 15,
            marginTop: 0
        },
        header: {
            alignSelf: 'center',
            width: '90%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '000'
        },
        footer: {
            width: '90%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: '0000'
        }
    }

    componentDidMount() {
        global.currentUser = undefined;
        global.language = localStorage.getItem('language').trim();
        this.setState({
            account: JSON.parse(localStorage.getItem('account')),
            language: localStorage.getItem('language')
        })
    }

    validateForm = () => {
        const options = {abortEarly: false}
        const schema = {
            username: Joi.string().email(),
            password: Joi.string()
        };
        const result = Joi.validate(this.state.account, schema);
        const error = {
            username: '',
            password: ''
        }
        if (result.error) {
            if (result.error.details[0].path[0] === 'username') {
                if (result.error.details[0].message.includes('username" is not allowed to be empty')) {
                    error.username = this.state.language === 'EN' ?
                        'Please enter user email' :
                        'من فضلك ادخل الايميل'
                } else {
                    error.username = this.state.language === 'EN' ?
                        'Please enter a valid email' :
                        'من فضلك ادخل ايميل صحيح'
                }
            } else if (result.error.details[0].path[0] === 'password') {
                error.password = this.state.language === 'EN' ?
                    'Please enter your password' :
                    'من فضلك ادخل كلمه المرور'
            }
        }
        return error
    }

    handleInput = ({name, value}) => {
        const account = {...this.state.account};
        account[name] = value
        this.setState({account});
    }

    handleLogin = async (e) => {
        e.preventDefault();
        const error = this.validateForm();
        error.server = '';
        this.setState({error});
        if (error.username || error.password) return

        try {
            const res = await http.post('http://localhost:3005/users/login', {
                email: this.state.account.username,
                password: this.state.account.password
            });
            global.currentUser = res.data.user;
            localStorage.setItem('account', JSON.stringify(this.state.account));
            localStorage.setItem('language', global.language);
            this.props.history.replace('/dashboard')
        } catch (ex) {
            const error = {...this.state.error};
            error.server = this.state.language === 'EN' ? 'Wrong Email or password' : 'خطأ في الايميل او كلمه المرور'
            if (ex.response) {
                this.setState({error})
            }
        }


    }

    setLanguage = (val) => {
        global.language = val;
        this.setState({language: val});
    }

    render() {
        return (
            <div style={this.styles.main}>

                <div style={this.styles.header}>
                    <h1 style={{color: '#16A3B8'}}>LimoTrack&reg;</h1>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-info" size="lg" id="dropdown-basic">
                            {this.state.language === 'EN' ? 'English' : 'العربيه'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.setLanguage('EN')}>English</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setLanguage('AR')}>العربيه</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </div>

                <div style={this.styles.form}>
                    <form onSubmit={this.handleLogin}>
                        <h3>{this.state.language === 'EN' ? 'Login' : 'تسجيل الدخول'}</h3>

                        <div className="input-group" style={{margin: 10}}>
                        <span className="input-group-text" id="basic-addon1">
                            <FaUserAlt style={{fontSize: 30}}/>
                        </span>
                            <input
                                style={this.styles.input}
                                type="text" className="form-control"
                                placeholder={this.state.language === 'EN' ? 'Enter E-Mail' : 'ادخل الايميل'}
                                value={this.state.account.username}
                                name='username'
                                onChange={(e) => this.handleInput(e.target)}
                            />

                        </div>
                        {this.state.error.username &&
                        <div className='alert alert-danger'> {this.state.error.username}</div>}
                        <div className="input-group" style={{margin: 10}}>
                        <span className="input-group-text" id="basic-addon1">
                            <FaLock style={{fontSize: 30}}/>
                        </span>
                            <input
                                style={this.styles.input}
                                type="password" className="form-control"
                                placeholder={this.state.language === 'EN' ? 'Enter password' : 'ادخل كلمه المرور'}
                                value={this.state.account.password}
                                name='password'
                                onChange={(e) => this.handleInput(e.target)}
                            />

                        </div>
                        {this.state.error.password &&
                        <div className='alert alert-danger'> {this.state.error.password}</div>}
                        {this.state.error.server &&

                        <div className='alert alert-danger'> {this.state.error.server}</div>}

                        <button type="submit" style={{borderRadius: 15, fontSize: 20}}
                                className="btn btn-primary btn-block  mt-4 ">
                            {this.state.language === 'EN' ? 'Login' : 'تسجيل الخول'}
                        </button>

                    </form>
                </div>

                <div style={this.styles.footer}>
                    <h2 style={{color: 'white'}}>Smart Tracking and fleet mangement </h2>
                </div>
            </div>
        );
    }
}