import React from 'react';

export default function Input({ name, label, onChange, ...rest }){
    return(
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                {...rest}
                className="form-control"
                id={name}
                name={name}
                onChange={(e)=>onChange(e.target)}
            />
        </div>
    );
}
