import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import '../presentation/form.css';
import {fetchAccount} from "../../actions/account";
import {FormErrors} from "../presentation/FormErrors";
import {Link} from "react-router-dom";

import {Translate} from "react-localize-redux";
import {useNavigate} from "react-router";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [account, setAccount] = useState(null);
    const [formErrors, setFormErrors] = useState({accessCode: "", email: ""})
    const [accessCodeValid, setAccessCodeValid] = useState(true)
    const [emailValid, setEmailValid] = useState(true)
    const [formValid, setFormValid] = useState(true)
    const [email, setEmail] = useState("")
    const [accessCode, setAccessCode] = useState("")

    const validateField=(fieldName, value)=> {
        let fieldValidationErrors = formErrors;
        let emailValid = emailValid;
        let accessCodeValid = accessCodeValid;

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
        setFormErrors(fieldValidationErrors)
        setAccessCodeValid(accessCodeValid)
        setEmailValid(emailValid)

        validateForm()
    }

    const validateForm=()=> {
        setFormValid(accessCodeValid && emailValid)
    }

    const errorClass=(error) =>{
        return(error.length === 0 ? '' : 'has-error');
    }

    const isFormValid=()=>{
        return JSON.stringify(formErrors).indexOf('error-required') < 0
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        validateField('email', email);
        validateField('accessCode', accessCode);

        if(isFormValid()){
            dispatch(fetchAccount({
                _id: accessCode,
                email : email,
                _class: "nl.elstarit.event.service.model.Account"
            }))
                .then(() => navigate('/events'))
                .catch(error => console.log(error));
        }

    }

    return (
            <div>
                <form onSubmit={onSubmit}>
                    <h2><Translate id="title-login"></Translate></h2>
                    { !formValid ? <FormErrors formErrors={formErrors} /> : "" }
                    <div id="no_account" style={{display: (account != null) ? 'block' : 'none' }}>
                        <p>
                            <span className="no-account-text"><Translate id="message-info-register"></Translate></span>
                            <Link to='/events' className='btn btn-primary'><Translate id="button-register"></Translate></Link>
                        </p>
                    </div>
                    <div className={`form-group ${errorClass(formErrors.email)}`}>

                        <label><Translate id="field-email"></Translate></label>

                        <input
                            className="form-control"
                            type="text"
                            id="email"
                            placeholder=""
                            name = "email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={`form-group ${errorClass(formErrors.accessCode)}`}>
                        <label><Translate id="field-accessCode"></Translate></label>
                        <input
                            className="form-control"
                            type="text"
                            id="accessCode"
                            placeholder=""
                            name = "accessCode"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success float-right">
                        <Translate id="button-login"></Translate>
                    </button>
                </form>

            </div>
        )
}

export default Login
