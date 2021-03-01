import React from 'react';
import Modal from "react-modal";
import {VscDiscard} from 'react-icons/vsc';
import {GiSave} from 'react-icons/gi';
import {Card} from "react-bootstrap";

export default class ItemModal extends React.Component {
    state = {
        data: {},

    }
    customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.9,
            padding: 0,
            boxShadow: "5px 5px 1px #9E9E9E"
        }
    };

    componentDidMount() {
        if (this.props.data) {
            this.setState({
                data: this.props.data
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data !== this.props.data) {
            this.setState({
                data: this.props.data
            });

        }

    }

    onInputChange = ({name, value}) => {
        const data = {...this.state.data};
        data[name] = value;
        this.setState({data});
    }

    render() {
        return (
            <div>
                    <Modal
                        isOpen={this.props.isOpen}
                        contentLabel='ItemModal'
                        ariaHideApp={false}
                        style={this.customStyles}
                    >

                        <Card style={{padding: 50, backgroundColor: '#f4f4f4'}}>
                            <h1>{this.props.header}</h1>
                            <hr />
                            {this.props.inputs.map(input => {
                                return (
                                    <div key={input.name} className="form-group"
                                         style={{
                                             display: 'flex',
                                             flexDirection: 'column',
                                             justifyContent: 'space-around'
                                         }}>
                                        <label htmlFor={input.name}><span
                                            style={{fontSize: 18}}>{input.label}</span></label>
                                        <input
                                            className="form-control"
                                            id={input.name}
                                            name={input.name}
                                            value={this.state.data[input.name]}
                                            onChange={(e) => this.onInputChange(e.target)}
                                        />
                                    </div>
                                )
                            })}
                            <div style={{display: "flex", justifyContent: 'space-between'}}>
                                <button
                                    className='btn btn-info mt-3'
                                    onClick={() => this.props.handleModalButtons({
                                        type: 'save',
                                        payload: this.state.data
                                    })}>
                                    <GiSave style={{fontSize: 28}}/>
                                </button>
                                <button className='btn btn-danger mt-3'
                                        onClick={() => this.props.handleModalButtons({type: 'cancel', payload: {}})}>
                                    <VscDiscard style={{fontSize: 28}}/>
                                </button>
                            </div>

                        </Card>
                    </Modal>
            </div>

        );
    }
}