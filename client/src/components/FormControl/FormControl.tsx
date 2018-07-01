import * as React from 'react';
import './FormControl.css';
import {IFormControlProps} from "../../entities";

const FormControl = (props: IFormControlProps) => {
    return (
        <div className="form-control">
            <p><label htmlFor={props.name}>{props.label}</label></p>
            <input type="text" name={props.name} onChange={props.onChange} placeholder={props.placeholder}/>
        </div>
    );
};

export default FormControl;