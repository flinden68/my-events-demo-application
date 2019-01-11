import React, {Component, bindActionCreators} from 'react'
import connect from "react-redux/es/connect/connect";
import { updateAccount } from '../../actions/account';
import {FormErrors} from "../presentation/FormErrors";
import { Translate, getActiveLanguage, setActiveLanguage } from "react-localize-redux";
import '../presentation/form.css';

const mapStateToProps = state => {
    return { 
        account: state.account,
        currentLanguage: getActiveLanguage(state.localize).code
     };
};

const mapDispatchToProps = dispatch => {
    return {
        updateAccount: (id, account) => dispatch(updateAccount(id, account)),
        setActiveLanguage: (code) => dispatch(setActiveLanguage(code))
    };
};

class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
            accessCode: props.account ? props.account._id : "",
            name: props.account ? props.account.name : "",
            email: props.account ? props.account.email : "",
            language: props.account ? props.account.language : props.currentLanguage,
            formErrors: {email: '',name: ''},
            emailValid: true,
            nameValid: true,
            formValid: true
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleLanguageInput = this.handleLanguageInput.bind(this);
    }

    handleEmailInput(e){
        const value = e.target.value;
        this.setState({email: value});
    }

    handleNameInput(e){
        const value = e.target.value;
        this.setState({name: value});
    }

    handleLanguageInput(e){
        const value = e.target.value;
        this.setState({language: value},
            this.changeLanguage(value));
    }

    changeLanguage(languageCode){
        this.props.setActiveLanguage(languageCode);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let nameValid = this.state.nameValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'error-required';
                break;
            case 'name':
                nameValid = value.length > 0;
                fieldValidationErrors.name = nameValid ? '' : 'error-required';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            nameValid: nameValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.nameValid });
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
        this.validateField('name', this.state.name);

        if(this.isFormValid()){
            let accountUpdate = {
                _id: this.props.account._id,
                email : this.state.email,
                name : this.state.name,
                language : this.state.language,
                _class: "nl.elstarit.event.service.model.Account"
            }

            this.props.updateAccount(accountUpdate.id, accountUpdate);
        }

    }

    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h2>Account</h2>
                    { !this.state.formValid ? <FormErrors formErrors={this.state.formErrors} /> : "" }
                    <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
                        <label><Translate id="field-name"></Translate></label>
                        <input
                            className="form-control"
                            type="text"
                            id="name"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleNameInput}
                        />
                    </div>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                        <label><Translate id="field-email"></Translate></label>
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