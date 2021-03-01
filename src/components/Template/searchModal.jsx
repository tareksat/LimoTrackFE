import React from 'react';
import Modal from "react-modal";
import {DropdownButton, Dropdown, ButtonGroup, Card} from "react-bootstrap";
import {VscDiscard} from "react-icons/vsc";
import {BsSearch} from "react-icons/bs";

export default class SearchModal extends React.Component {
    state = {
        searchValue: '',
        selectedOption: {label: this.props.searchKeys[0].label, name: this.props.searchKeys[0].name}
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


    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                contentLabel='AccountSearch'
                ariaHideApp={false}
                style={this.customStyles}
            >
                <Card style={{padding: 20, backgroundColor: '#f4f4f4'}}>
                    <div className='container'>
                        <h1>{this.props.header}</h1>
                        <hr/>
                        <DropdownButton
                            as={ButtonGroup}
                            style={{marginBottom: 5, width: '100%'}}
                            id={`dropdown-variants-`}
                            title={this.state.selectedOption.label}
                        >
                            {this.props.searchKeys.map(key => {
                                return (
                                    <Dropdown.Item
                                        key={key.name}
                                        eventKey={key.label}
                                        onSelect={(e) => this.setState({
                                            'selectedOption.label': e
                                        })}
                                    >
                                        {key.label}
                                    </Dropdown.Item>
                                );
                            })}
                        </DropdownButton>
                        <hr/>
                        <div className="form-group">
                            <input
                                className="form-control"
                                id='name'
                                name='accountName'
                                value={this.state.searchValue}
                                onChange={(e) => this.setState({
                                    searchValue: e.target.value
                                })}
                            />
                        </div>

                        <div style={{display: "flex", justifyContent: 'space-between'}}>
                            <button
                                className='btn btn-info mt-3'
                                onClick={() => this.props.handleSearchButtons({
                                    type: 'search',
                                    payload: {
                                        key: this.state.selectedOption.name,
                                        value: this.state.searchValue
                                    }
                                })}
                            >
                                <BsSearch style={{fontSize: 28}}/>
                            </button>
                            <button className='btn btn-danger mt-3'
                                    onClick={() => this.props.handleSearchButtons({type: 'cancel', payload: null})}
                            >
                                <VscDiscard style={{fontSize: 28}}/>
                            </button>
                        </div>

                    </div>
                </Card>
            </Modal>
        );
    }
}