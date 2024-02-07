import React, {useEffect, useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Link} from 'react-router-dom';
import '../presentation/form.css';
import {FormErrors} from "../presentation/FormErrors";
import {Translate} from "react-localize-redux";
import useAuth from "../../hooks/useAuth";

const labelStyle = {
    marginRight: '10px'
};

const EventForm = (props) => {
    const {account} = useAuth()
    const [formErrors, setFormErrors] = useState({title: '', description: '', location: ''})
    const [titleValid, setTitleValid] = useState(true)
    const [descriptionValid, setDescriptionValid] = useState(true)
    const [locationValid, setLocationValid] = useState(true)
    const [formValid, setFormValid] = useState(true)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [startInput, setStartInput] = useState(new Date())
    const [endInput, setEndInput] = useState(new Date())
    const [userId, setUserId] = useState(account._id)
    const [location, setLocation] = useState("")
    const [created, setCreated] = useState(new Date())
    const [modified, setModified] = useState(new Date())

    useEffect(() => {
        const {event} = props;

        if(event != null) {
            setTitle(event.title)
            setDescription(event.description)
            setStartInput(new Date(event.start))
            setEndInput(new Date(event.end))
            setLocation(event.location)
            setCreated(event.created)
            setModified(event.modified)
        }
    }, [props.event]);

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleChangeStartDate = (date) => {
        setStartInput(date)
    }

    const handleChangeEndDate = (date) => {
       setEndInput(date)
    }

    const handleChangeLocation = (e) => {
        setLocation(e.target.value)
    }

    const validateField = (fieldName, value) => {
        let fieldValidationErrors = formErrors;
        let titleValid = titleValid;
        let descriptionValid = descriptionValid;
        let locationValid = locationValid;

        switch(fieldName) {
            case 'title':
                titleValid = value.length > 0;
                fieldValidationErrors.title = titleValid ? '': 'error-required';
                break;
            case 'description':
                descriptionValid = value.length > 0;
                fieldValidationErrors.description = descriptionValid ? '': 'error-required';
                break;
            case 'location':
                locationValid = value.length > 0;
                fieldValidationErrors.location = locationValid ? '': 'error-required';
                break;
            default:
                break;
        }

        setFormErrors(fieldValidationErrors);
        setTitleValid(titleValid);
        setDescriptionValid(descriptionValid);
        setLocationValid(locationValid);
        validateForm();
    }

    const validateForm = () =>{
        setFormValid(titleValid && descriptionValid && locationValid);
    }

    const errorClass = (error) =>{
        return(error.length === 0 ? '' : 'has-error');
    }

    const isFormValid = () =>{
        return JSON.stringify(formErrors ).indexOf('error-required') < 0
    }

    const onSubmit = (e) =>{

        e.preventDefault();

        validateField('title', title);
        validateField('description', description);
        validateField('location', location);
        if(isFormValid()){

            let eventUpdate = {
                title: title,
                description: description,
                start: new Date(startInput).getTime(),
                end: new Date(endInput).getTime(),
                location: location,
                userId: userId,
                created: created,
                modified: modified
            }

            const {onSubmitEvent} = props;

            if (onSubmitEvent && typeof onSubmitEvent === 'function') {
                onSubmitEvent(eventUpdate);
            }
        }

    }

    return (
            <div>
            <form onSubmit={onSubmit}>
                { !formValid ? <FormErrors formErrors={formErrors} /> : "" }
                <div className={`form-group ${errorClass(formErrors.title)}`}>
                    <label htmlFor="title"><Translate id="field-title"></Translate></label>
                    <input
                        className="form-control"
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleChangeTitle}
                    />
                </div>
                <div className={`form-group ${errorClass(formErrors.description)}`}>
                    <label htmlFor="description"><Translate id="field-description"></Translate></label>
                    <input
                        className="form-control"
                        type="textarea"
                        id="description"
                        value={description}
                        onChange={handleChangeDescription}
                    />
                </div>
                <div className={`form-group ${errorClass(formErrors.location)}`}>
                    <label htmlFor="location"><Translate id="field-location"></Translate></label>
                    <input
                        className="form-control"
                        type="text"
                        id="location"
                        value={location}
                        onChange={handleChangeLocation}
                    />
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-6">
                            <label style={labelStyle}>
                            <Translate id="field-start-date"></Translate>
                            </label>
                            <DatePicker
                                id="start_date"
                                className="form-control"
                                selected={startInput}
                                onChange={handleChangeStartDate}
                                dateFormat="dd-MM-yyyy"
                            />
                        </div>
                        <div className="col-6">
                            <label style={labelStyle}>
                                <Translate id="field-end-date"></Translate>
                            </label>
                            <DatePicker
                                id="end_date"
                                className="form-control"
                                selected={endInput}
                                onChange={handleChangeEndDate}
                                dateFormat="dd-MM-yyyy"
                            />
                        </div>
                    </div>
                </div>
                <Link to='/events' className='btn btn-primary'>
                    <Translate id="button-back"></Translate>
                </Link>
                <button type="submit" className="btn btn-success float-right">
                    <Translate id="button-save"></Translate>
                </button>
            </form>
            </div>
    )
}

export default (EventForm);
