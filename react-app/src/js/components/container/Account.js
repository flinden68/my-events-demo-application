import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import { updateAccount } from '../../actions/account';
import {FormErrors} from "../presentation/FormErrors";
import { Translate, getActiveLanguage } from "react-localize-redux";
import '../presentation/form.css';

const mapStateToProps = state => {
    return { 
        account: state.account,
        currentLanguage: getActiveLanguage(state.localize).code
     };
};

const mapDispatchToProps = dispatch => {
    return {
        updateAccount: (id, account) => dispatch(updateAccount(id, account))
    };
};

class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
            accessCode: props.account ? props.account._id : "",
            email: props.account ? props.account.email : "",
            language: props.account ? props.account.langauge : props.currentLanguage,
            formErrors: {email: ''},
            emailValid: true,
            formValid: true
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handleLanguageInput = this.handleLanguageInput.bind(this);

        console.log('Current state = '+ JSON.stringify(this.props.account));
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
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
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

    onSubmit(e){
        e.preventDefault();

        this.validateField('email', this.state.email);

        if(this.state.formValid){
            let accountUpdate = {
                _id: this.props.account._id,
                email : this.state.email,
                language : this.state.language,
                _class: "nl.elstarit.event.service.model.Account"
            }

            this.props.updateAccount(this.accountUpdate.id, accountUpdate);
        }

    }

    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h2>Account</h2>
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
                    <div className="form-group">
                        <label><Translate id="field-accessCode"></Translate></label>
                        <div className="form-control no-border">
                            <span>{this.state.accessCode}</span>
                        </div>
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
                    <Translate id="button-update"></Translate>
                    </button>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)