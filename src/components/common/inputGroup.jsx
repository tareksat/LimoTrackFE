import React from 'react';
import {FormControl, InputGroup} from "react-bootstrap";

const Input = (props) => {
    return(
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                className="form-control"
                id={name}
                name={name}

            />
        </div>
    )
}

export default Input;