import React, {Component} from "react";
import _ from 'lodash';
import Template from "./Template/template";
import url from '../config/urls.json';
import http from '../services/httpServices';
import dateFormat from "../services/dateFormat";
import global from "../services/data";

export default class Path extends Component {
    state = {
        data: [],
        header: {EN: 'Pathways', AR: "خطوط السير"},
        itemModalHeader: {EN: 'Pathway Details', AR: "تفاصيل خط السير"},
        itemModalInputs: {
            EN: [{name: 'pathName', label: 'Name'}],
            AR: [{name: 'pathName', label: 'الإسم'}]
        },
        searchModalHeader: {EN: 'Search', AR: "بحث"},
        searchModalSearchKeys: {
            EN: [{label: 'Name', name: 'pathName'}]
        },
        tableHeader: {
            EN: ['Name',''],
            AR: ['الإسم','']
        }
    }

    async componentDidMount() {
        await this.loadAll()
    }

    pickValues = (values) => {
        const items = [];
        values.map(value => {
            items.push(_.pick(value, ['_id', 'pathName']));
        });
        return items;
    }

    loadAll = async () => {
        try {
            const {data} = await http.get(url.path.load+global.currentGroup._id);
            this.setState({data});
        } catch (e) {
            console.log(e);
        }
    }

    create = async (path) => {
        path.account = global.currentAccount._id;
        try {
            await http.post(url.path.create+global.currentGroup._id+'/'+path.pathName);
            await this.loadAll();
        } catch (e) {
            console.log(e);
        }
    }

    remove = async (group) => {
        try {
            await http.delete(url.path.remove + group._id);
        } catch (e) {
            console.log(e);
        }
    }

    update = async (path) => {
        try {
            await http.put(url.path.update + global.currentGroup._id+'/'+path._id+'/'+path.pathName);
        } catch (e) {
            console.log(e);
        }
    }

    search = async (data) => {
        // try {
        //     const res = await http.get(url.groups.search + data.value+'/'+this.props.match.params.account_id);
        //     this.setState({data: res.data});
        // } catch (e) {
        //     console.log(e);
        // }
    }

    visitLink = async (data) => {
       // this.props.history.push('/dashboard/group')
    }

    render() {
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
                create={this.create}
                remove={this.remove}
                update={this.update}
                search={this.search}
                visitLink={this.visitLink}
            />
        )
    }
}