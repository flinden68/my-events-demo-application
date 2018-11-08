import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import '../presentation/form.css';
import {FormErrors} from "../presentation/FormErrors";

const mapStateToProps = state => {
    return { account: state.account };
};

/*const mapDispatchToProps = dispatch => {
    return {
        performLogin: login => dispatch(deleteEvent(event)),
        fetchAllEvents: () => dispatch(fetchAllEvents())
    };
};*/

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
    }

    handleUserInput(e){
        const name = e.target.name;
        const value = e.target.value;
        console.log(name + '-' + value);
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    }

    handleEmailInput(e){
        const value = e.target.value;
        console.log('email-' + value);
        this.setState({email: value},
            () => { this.validateField('email', value) });
    }

    handlePasswordInput(e){
        const value = e.target.value;
        console.log('password-' + value);
        this.setState({password: value},
            () => { this.validateField('password', value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }


    onSubmit(e){

        e.preventDefault();

        if (!this.state.email) {
            this.setState(() => ({error: 'Please set email!'}));
        }else if (!this.state.password) {
                this.setState(() => ({ error: 'Please set password!' }));
        } else {
            this.setState(() => ({ error: '' }));

            let login = {
                email: this.state.email,
                password: this.state.password,
                _class: "nl.elstarit.event.service.model.Login"
            }

            console.log('Login: ' + login);

            //this.props.onSubmitEvent(event);
        }

    }

    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h2>Login</h2>
                    { !this.state.formValid ? <FormErrors formErrors={this.state.formErrors} /> : "" }
                    <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                        <label>Email</label>
                        <input
                            className="form-control"
                            type="text"
                            id="email"
                            placeholder="Email address"
                            value={this.state.email}
                            onChange={this.handleEmailInput}
                        />
                    </div>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                        <label>Password</label>
                        <input
                            className="form-control"
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handlePasswordInput}
                        />
                    </div>
                    <button type="submit" className="btn btn-success float-right" disabled={!this.state.formValid}>
                        Login
                    </button>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Login)