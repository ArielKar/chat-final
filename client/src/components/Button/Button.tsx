import * as React from 'react';
import './Button.css';
import {IButtonProps} from "../../entities";

const Button = (props: IButtonProps) => {
    return (
        <button type={props.type} onClick={props.click} className={props.class} disabled={props.isDisabled}>{props.text}</button>
    );
};

export default Button;