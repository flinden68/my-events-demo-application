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
            formErrors: {email: ''},
            emailValid: true,
            formValid: true
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
    }

    handleEmailInput(e){
        const value = e.target.value;

        this.setState({email: value});
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
        }, this.validateForm);
    }

    validateForm() {
        console.log('this.state.emailValid: ' + this.state.emailValid)
        this.setState({formValid: this.state.emailValid });
        console.log('validForm: ' + this.state.formValid)
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }

    onSubmit(e){
        e.preventDefault();

        this.validateField('email', this.state.email);
        if(this.state.formValid){
            this.setState(() => ({ error: '' }));

            let account = {
                email: this.state.email,
                _class: "nl.elstarit.event.service.model.Account"
            }

            console.log('Login: ' + JSON.stringify(account));

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
                        <label>Email address</label>
                        <input
                            className="form-control"
                            type="text"
                            id="email"
                            placeholder="Email address"
                            value={this.state.email}
                            onChange={this.handleEmailInput}
                        />
                    </div>
                    <button type="submit" className="btn btn-success float-right">
                        Login
                    </button>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Login)