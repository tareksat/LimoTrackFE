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
        header: {EN: 'Accounts', AR: "إداره الاسطول"},
        itemModalHeader: {EN: 'Account Details', AR: "تفاصيل الشركه"},
        itemModalInputs: {
            EN: [{name: 'accountName', label: 'Name'}, {name: 'address', label: 'address'}],
            AR: [{name: 'accountName', label: 'الإسم'}, {name: 'address', label: 'العنوان'}]
        },
        searchModalHeader: {EN: 'Search', AR: "بحث"},
        searchModalSearchKeys: {
            EN: [{label: 'Name', name: 'accountName'}],
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
            items.push(_.pick(value, ['_id', 'accountName', 'createdOn']));
        });
        return items;
    }

    loadAll = async () => {
        try {
            const {data} = await http.get(url.accounts.load);
            this.setState({data});
        } catch (e) {
            console.log(e);
        }
    }

    createAccount = async (account) => {
        try {
            await http.post(url.accounts.create, account);
        } catch (e) {
            console.log(e);
        }
    }

    removeAccount = async (account) => {
        try {
            await http.delete(url.accounts.remove + account._id);
        } catch (e) {
            console.log(e);
        }
    }

    updateAccount = async (account) => {
        try {
            await http.put(url.accounts.update + account._id, {accountName: account.accountName});
        } catch (e) {
            console.log(e);
        }
    }

    searchAccount = async (data) => {
        try {
            const res = await http.get(url.accounts.search + data.value);
            this.setState({data: res.data});
        } catch (e) {
            console.log(e);
        }
    }

    visitLink = async (data) => {
        global.currentAccount = data;
        this.props.history.push('/dashboard/groups/')
    }

    render(){
        return (
            <Template
                header={this.state.header[global.language]}
                itemModalHeader={this.state.itemModalHeader[global.language]}
                itemModalInputs={this.state.itemModalInputs[global.language]}
                searchModalHeader={this.state.searchModalHeader[global.language]}
                searchModalSearchKeys={this.state.searchModalSearchKeys[global.language]}
                tableHeader={this.state.tableHeader[global.language]}
                tableData={this.pickValues(this.state.data)}
                load={this.loadAll}
                create={this.createAccount}
                remove={this.removeAccount}
                update={this.updateAccount}
                search={this.searchAccount}
                visitLink={this.visitLink}
            />
        );
    }
}