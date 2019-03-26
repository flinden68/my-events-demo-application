import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import '../presentation/form.css';
import {fetchAccount} from "../../actions/account";
import {FormErrors} from "../presentation/FormErrors";
import {Link} from "react-router-dom";

import { Translate } from "react-localize-redux";

const mapStateToProps = state => {
    return { account: state.account };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAccount: (account) => dispatch(fetchAccount(account))
    };
};

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            accessCode: "",//props.account ? props.account.accessCode : "",
            email: "",//props.account ? props.account.email : "",
            formErrors: {accessCode: '', email: ''},
            accessCodeValid: true,
            emailValid: true,
            formValid: true
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleAccessCodeInput = this.handleAccessCodeInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
    }

    handleAccessCodeInput(e){
        const value = e.target.value;
        this.setState({accessCode: value});
    }

    handleEmailInput(e){
        const value = e.target.value;
        this.setState({email: value});
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let accessCodeValid = this.state.accessCodeValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'error-required';
                break;
            case 'accessCode':
                accessCodeValid = value.length > 0;
                fieldValidationErrors.accessCode = accessCodeValid ? '': 'error-required';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            accessCodeValid: accessCodeValid,
            emailValid: emailValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.accessCodeValid && this.state.emailValid });
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    } 

    isFormValid(){
        return JSON.stringify(this.state.formErrors).indexOf('error-required') < 0
    }

    onSubmit(e){
        e.preventDefault();

        this.validateField('email', this.state.email);
        this.validateField('accessCode', this.state.accessCode);

        if(this.isFormValid()){
            let account = {
                _id: this.state.accessCode,
                email : this.state.email,
                _class: "nl.elstarit.event.service.model.Account"
            }
            this.props.fetchAccount(account);
        }

    }

    render(){
        
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h2><Translate id="title-login"></Translate></h2>
                    { !this.state.formValid ? <FormErrors formErrors={this.state.formErrors} /> : "" }
                    <div id="no_account" style={{display: (this.props.account != null) ? 'block' : 'none' }}>
                        <p>
                            <span className="no-account-text"><Translate id="message-info-register"></Translate></span>
                            <Link to='/events' className='btn btn-primary'><Translate id="button-register"></Translate></Link>
                        </p>
                    </div>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>

                        <label><Translate id="field-email"></Translate></label>

                        <input
                            className="form-control"
                            type="text"
                            id="email"
                            placeholder=""
                            value={this.state.email}
                            onChange={this.handleEmailInput}
                        />
                    </div>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.accessCode)}`}>
                        <label><Translate id="field-accessCode"></Translate></label>
                        <input
                            className="form-control"
                            type="text"
                            id="accessCode"
                            placeholder=""
                            value={this.state.accessCode}
                            onChange={this.handleAccessCodeInput}
                        />
                    </div>
                    <button type="submit" className="btn btn-success float-right">
                        <Translate id="button-login"></Translate>
                    </button>
                </form>

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)