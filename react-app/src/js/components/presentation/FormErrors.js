import React from 'react';
import { Translate } from "react-localize-redux";

export const FormErrors = ({formErrors}) =>
    <div className='alert alert-danger'>
        {Object.keys(formErrors).map((fieldName, i) => {
            if(formErrors[fieldName].length > 0){
                return (
                    <div key={i}><Translate id={'field-'+fieldName}></Translate> <Translate id="error-required"></Translate></div>
                )
            } else {
                return '';
            }
        })}
    </div>