import React, {Component} from "react";
import _ from 'lodash';
import Template from "./Template/template";
import url from '../config/urls.json';
import http from '../services/httpServices';
import dateFormat from "../services/dateFormat";
import global from "../services/data";

export default class Accounts extends Component {

    state = {
        data: [],
        itemModalHeader: {EN: 'Account Details', AR: "تفاصيل الشركه"},
        itemModalInputs: {
            EN: [{name: 'groupName', label: 'Name'}, {name: 'address', label: 'address'}],
            AR: [{name: 'groupName', label: 'الإسم'}, {name: 'address', label: 'العنوان'}]
        },
        searchModalHeader: {EN: 'Search', AR: "بحث"},
        searchModalSearchKeys: {
            EN: [{label: 'Name', name: 'groupName'}],
            AR: [{label: 'العنوان', name: 'address'}]
        },
        tableHeader: {
            EN: ['Name',  'Date created',''],
            AR: ['الإسم',  'تاريخ الإنشاء','']
        }
    }

    async componentDidMount() {
        await this.loadAll()
    }

    pickValues = (values) => {
        const items = [];
        values.map(value => {
            if(!isNaN(Date.parse(value.createdOn)))
                value.createdOn = dateFormat(value.createdOn);
            items.push(_.pick(value, ['_id', 'groupName', 'createdOn']));
        });
        return items;
    }

    loadAll = async () => {
        try {
            const {data} = await http.get(url.groups.load+global.currentAccount._id);
            this.setState({data});
        } catch (e) {
            console.log(e);
        }
    }

    createGroup = async (group) => {
        group.account = global.currentAccount._id;
        try {
            await http.post(url.groups.create, group);
        } catch (e) {
            console.log(e);
        }
    }

    removeGroup = async (group) => {
        try {
            await http.delete(url.groups.remove + group._id);
        } catch (e) {
            console.log(e);
        }
    }

    updateGroup = async (group) => {
        group.account = global.currentAccount._id;
        try {
            await http.put(url.groups.update + group._id, group);
        } catch (e) {
            console.log(e);
        }
    }

    searchGroup = async (data) => {
        try {
            const res = await http.get(url.groups.search + data.value+'/'+global.currentAccount._id);
            this.setState({data: res.data});
        } catch (e) {
            console.log(e);
        }
    }

    visitLink = async (data) => {
        global.currentGroup = data;
        this.props.history.push('/dashboard/group/')
    }

    render() {
        return (
            <Template
                header={global.currentAccount.accountName}
                itemModalHeader={this.state.itemModalHeader[global.language]}
                itemModalInputs={this.state.itemModalInputs[global.language]}
                searchModalHeader={this.state.searchModalHeader[global.language]}
                searchModalSearchKeys={this.state.searchModalSearchKeys[global.language]}
                tableHeader={this.state.tableHeader[global.language]}
                tableData={this.pickValues(this.state.data)}
                load={this.loadAll}
                create={this.createGroup}
                remove={this.removeGroup}
                update={this.updateGroup}
                search={this.searchGroup}
                visitLink={this.visitLink}
            />
        )
    }
}