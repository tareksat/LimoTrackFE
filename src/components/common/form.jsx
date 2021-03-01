import React, {Component} from 'react';
import Joi from 'joi-browser';
import Input from'./input';
/*
renderSubmit(label)
renderInput(name, error, label)
 */
export default class Form extends Component {
    state = {
        data: {
        },
        error: {}
    }

    validate = () => {
        const options = {abortEarly: false}
        const result = Joi.validate(this.state.data, this.schema, options );
        const error = {};
        if(!result.error) return null

        for(let item of result.error.details){
            error[item.path[0]] = item.message;
        }
        return error
    }

    validatePropery = ({ name, value }) => {
        const obj = {[name]: value}
        const schema = {[name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);
        return error ? {[name]: error.details[0].message} : null
    }
    handleChange = ({currentTarget: input}) => {
        const error = this.validatePropery(input);
        if(error){
            this.setState({error});
        }
        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data, error: error? error: {}})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let error = this.validate();
        if (error) {
            this.setState({error});
            return;
        }
        this.doSubmit();
    }

    renderSubmit = (label) => {
        return(
            <button
                type="submit"
                className="btn btn-primary"
                disabled={this.validate()}
            >{label}
            </button>
        )
    }

    renderInput = (name, type, label, placeholder) =>{
        return(
            <Input
                name={name}
                label={label}
                type={type}
                error={this.state.error[name]}
                value={this.state.data[name]}
                onChange={this.handleChange}
                placeholder={placeholder}
            />
        )
    }
}