import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import {createAccount} from "../../actions/account";
import {FormErrors} from "../presentation/FormErrors";
import { Translate, getActiveLanguage } from "react-localize-redux";

const mapStateToProps = state => {
    return { 
        account: state.account,
        currentLanguage: getActiveLanguage(state.localize).code
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createAccount: (account) => dispatch(createAccount(account))
    };
};

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",//props.account ? props.account.email : "",
            language: props.currentLanguage,
            formErrors: {email: ''},
            emailValid: true,
            formValid: true,
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handleLanguageInput = this.handleLanguageInput.bind(this);
    }

    handleEmailInput(e){
        const value = e.target.value;
        this.setState({email: value});
    }

    handleLanguageInput(e){
        const value = e.target.value;
        this.setState({language: value});
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'error-required';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid });
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
        
        if(this.isFormValid()){
            let account = {
                email : this.state.email,
                language : this.state.language,
                _class: "nl.elstarit.event.service.model.Account"
            }

            console.log("account: " + JSON.stringify(account))
            //this.props.createAccount(account);
        }

    }

    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h2><Translate id="title-register"></Translate></h2>
                    { !this.state.formValid ? <FormErrors formErrors={this.state.formErrors} /> : "" }
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
                    <div className={`form-group`}>
                        <label><Translate id="field-language"></Translate></label>
                        <br />
                        <div className="form-check-inline">                   
                            <label className="form-check-label">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="language"
                                    placeholder=""
                                    value="en"
                                    onChange={this.handleLanguageInput}
                                    checked={this.state.language == 'en'}
                                />
                                <Translate id='language-en'></Translate>
                            </label>
                        </div>
                        
                        <div className="form-check-inline"> 
                            <label className="form-check-label">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="language"
                                    placeholder=""
                                    value="nl"
                                    onChange={this.handleLanguageInput}
                                    checked={this.state.language == 'nl'}
                                />
                                <Translate id='language-nl'></Translate>
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success float-right">
                    <Translate id="button-register"></Translate>
                    </button>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register)