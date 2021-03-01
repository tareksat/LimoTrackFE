import React, {Component} from 'react';
import ControlBar from './controlBar';
import Table from "./table";
import ItemModal from './itemModal';
import SearchModal from './searchModal';
import ConfirmationModal from "../common/confirmationModal";
import {Card} from "react-bootstrap";
import global from "../../services/data";

/*   required props

1. header: string
2. itemModalInputs: [{name: string, label: string },...]
3. itemModalHeader: string
4. searchModalHeader: string
5. searchModalSearchKeys: [string, ...]
6. tableHeader: [string, ....]
7. tableData: [{dataObjects}...]
8. load from server function
9. delete from server function
10.add to server function
11.search functions

 */

export default class Template extends Component {
    state = {
        header: 'H E A D E R',
        itemModal: false,
        searchModal: false,
        confirmationModal: false,
        selectedItem: {},
        isEdit: false
    }

    handleTableButton = async (action) => {
        // action: {type:edit/remove, payload: {data}}
        if (action.type === 'edit')
            this.setState({
                itemModal: true,
                isEdit: true,
                selectedItem: action.payload
            });
        else if (action.type === 'remove') {
            this.setState({confirmationModal: true, selectedItem: action.payload});
            // await this.props.remove(action.payload);
            // await this.props.load()
        } else if (action.type === 'link') {
            this.props.visitLink(action.payload);
        }

    }

    removeSelection = async (action) => {
        if(action){
            await this.props.remove(this.state.selectedItem);
            await this.props.load();
        }
        this.setState({
            confirmationModal: false,
            selectedItem: {}
        })
    }

    handleBarAction = (action) => {
        switch (action) {
            case "add":
                this.setState({itemModal: true, selectedItem: {}});
                return
            case 'load':
                this.props.load()
                return
            case 'search':
                this.setState({searchModal: true});
                return
        }
    }

    handleModalButtons = async (action) => {
        //{type:'cancel'/'save', payload: data}
        this.setState({
            itemModal: false
        });
        if (action.type === 'save' && this.state.isEdit) {
            await this.props.update(action.payload);
            await this.props.load()
        } else if (action.type === 'save' && !this.state.isEdit) {
            await this.props.create(action.payload);
            await this.props.load();
        }
        this.setState({
            isEdit: false
        })

    }

    handleSearchButtons = (action) => {
        //{type:'search'/'cancel', payload: {key, value}}

        this.setState({
            searchModal: false
        });
        if (action.type === 'search') {
            this.props.search(action.payload)
            return
        }
    }

    render() {
        return (
            <div style={{padding: 0, margin: 0, height: '100vh' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent:'space-between',
                        height: '91vh',
                        margin: 20,
                    }}>
                    <Card style={{boxShadow: "5px 5px 1px #9E9E9E"}}>
                        <Card.Title
                            style={{
                                textAlign: global.language === 'EN' ? 'left' : 'right',
                                marginTop: 10,
                                marginLeft: 20,
                                marginRight: 20
                            }}
                        >
                            <h2>{this.props.header}</h2>
                        </Card.Title>

                        <ItemModal
                            isOpen={this.state.itemModal}
                            inputs={this.props.itemModalInputs}
                            data={this.state.selectedItem}
                            handleModalButtons={this.handleModalButtons}
                            header={this.props.itemModalHeader}
                        />

                        <SearchModal
                            isOpen={this.state.searchModal}
                            searchKeys={this.props.searchModalSearchKeys}
                            handleSearchButtons={this.handleSearchButtons}
                            header={this.props.searchModalHeader}
                        />

                        <ConfirmationModal
                            isOpen={this.state.confirmationModal}
                            close={this.removeSelection}
                        />

                        <Table
                            header={this.props.tableHeader}
                            data={this.props.tableData}
                            handleTableButton={this.handleTableButton}
                        />

                    </Card>

                    <div style={{marginBottom: 40, width:'100%'}}>
                        <Card style={{backgroundColor: '#343B3F'}}>
                            <ControlBar
                                handleBarAction={this.handleBarAction}
                            />
                        </Card>

                    </div>
                </div>
            </div>
        );
    }
}