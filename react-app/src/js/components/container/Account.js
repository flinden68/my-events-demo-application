import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {updateAccount} from '../../actions/account';
import {FormErrors} from "../presentation/FormErrors";
import {setActiveLanguage, Translate} from "react-localize-redux";
import '../presentation/form.css';
import useLocalize from "../../hooks/useLocalize";
import useAuth from "../../hooks/useAuth";

const Account = () => {
    const dispatch = useDispatch();
    const {account} = useAuth();
    const {code} = useLocalize();
    const [formErrors, setFormErrors] = useState({name: "", email: ""})
    const [nameValid, setNameValid] = useState(true)
    const [emailValid, setEmailValid] = useState(true)
    const [formValid, setFormValid] = useState(true)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [accessCode, setAccessCode] = useState("")
    const [language, setLanguage] = useState(code)

    useEffect(() => {
        if(account != null) {
            setName(account.name);
            setEmail(account.email);
            setLanguage(account.language);
            setAccessCode(account._id)
        }
    }, []);
    const handleEmailInput = (e) => {
        const value = e.target.value;
        setEmail(e.target.value)
    }

    const handleNameInput = (e) => {
        setName(e.target.value)
    }

    const handleLanguageInput = (e) => {
        setLanguage(e.target.value)
        changeLanguage(e.target.value);
    }

    const changeLanguage = (languageCode) =>{
        setActiveLanguage(languageCode);
    }

    const validateField = (fieldName, value) => {
        let fieldValidationErrors = formErrors;
        let emailValid = emailValid;
        let nameValid = nameValid;

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
        setFormErrors(fieldValidationErrors);
        setEmailValid(emailValid);
        setName(nameValid);
        validateForm()
    }

    const validateForm = () => {
        setFormValid(emailValid && nameValid);
    }

    const errorClass = (error) => {
        return(error.length === 0 ? '' : 'has-error');
    }

    const isFormValid = () =>{
        return JSON.stringify(formErrors).indexOf('error-required') < 0
    }

    const onSubmit = (e) =>{
        e.preventDefault();

        validateField('email', email);
        validateField('name', name);

        if(isFormValid()){
            let accountUpdate = {
                _id: account._id,
                email : email,
                name : name,
                language : language,
                _class: "nl.elstarit.event.service.model.Account"
            }

            dispatch(updateAccount(accountUpdate._id, accountUpdate));
        }

    }

    return (
            <div>
                <form onSubmit={onSubmit}>
                    <h2>Account</h2>
                    { !formValid ? <FormErrors formErrors={formErrors} /> : "" }
                    <div className={`form-group ${errorClass(formErrors.name)}`}>
                        <label><Translate id="field-name"></Translate></label>
                        <input
                            className="form-control"
                            type="text"
                            id="name"
                            placeholder="Name"
                            value={name}
                            onChange={handleNameInput}
                        />
                    </div>
                    <div className={`form-group ${errorClass(formErrors.email)}`}>
                        <label><Translate id="field-email"></Translate></label>
                        <input
                            className="form-control"
                            type="text"
                            id="email"
                            placeholder="Email address"
                            value={email}
                            onChange={handleEmailInput}
                        />
                    </div>
                    <div className="form-group">
                        <label><Translate id="field-accessCode"></Translate></label>
                        <div className="form-control no-border">
                            <span>{accessCode}</span>
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
                                    onChange={handleLanguageInput}
                                    checked={language === 'en'}
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
                                    onChange={handleLanguageInput}
                                    checked={language === 'nl'}
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

export default (Account)
