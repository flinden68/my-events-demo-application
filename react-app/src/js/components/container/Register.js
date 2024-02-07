import React, {useState} from 'react'
import {createAccount} from "../../actions/account";
import {FormErrors} from "../presentation/FormErrors";
import {Translate} from "react-localize-redux";
import {useDispatch} from "react-redux";
import useAuth from "../../hooks/useAuth";
import useLocalize from "../../hooks/useLocalize";
import {useNavigate} from "react-router";

const Register = () => {
    const navigate = useNavigate();
    const account = useAuth();
    const {code} = useLocalize();
    const dispatch = useDispatch()
    const [formErrors, setFormErrors] = useState({email: ""})
    const [emailValid, setEmailValid] = useState(true)
    const [formValid, setFormValid] = useState(true)
    const [email, setEmail] = useState("")
    const [language, setLanguage] = useState(code)

    const handleEmailInput = (e) => {
        setEmail(e.target.value)
    }

    const handleLanguageInput = (e) => {
        setLanguage(e.target.value)
    }

    const validateField = (fieldName, value) => {
        let fieldValidationErrors = formErrors;
        let emailValid = emailValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'error-required';
                break;
            default:
                break;
        }
        setFormErrors(fieldValidationErrors)
        setEmailValid(emailValid)
        validateForm()
    }

    const validateForm = () => {
        setFormValid(emailValid)
    }

    const errorClass = (error) => {
        return(error.length === 0 ? '' : 'has-error');
    }

    const isFormValid = () => {
        return JSON.stringify(formErrors).indexOf('error-required') < 0
    }

    const onSubmit = (e) => {

        e.preventDefault();
        validateField('email', email);

        if(isFormValid()) {
            let accountNew = {
                email : email,
                language : language,
                _class: "nl.elstarit.event.service.model.Account"
            }

            console.log("account: " + JSON.stringify(accountNew))
            //this.props.createAccount(account);
            dispatch(createAccount(accountNew))
                .then(() => navigate('/account'))
                .catch(error => console.log(error));
        }
    }

    return (
            <div>
                <form onSubmit={onSubmit}>
                    <h2><Translate id="title-register"></Translate></h2>
                    { !formValid ? <FormErrors formErrors={formErrors} /> : "" }
                    <div className={`form-group ${errorClass(formErrors.email)}`}>
                        <label><Translate id="field-email"></Translate></label>
                        <input
                            className="form-control"
                            type="text"
                            id="email"
                            placeholder=""
                            value={email}
                            onChange={handleEmailInput}
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
                    <Translate id="button-register"></Translate>
                    </button>
                </form>
            </div>
        )
}

export default (Register)
