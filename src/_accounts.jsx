import React, {Component} from "react";
import {toast} from "react-toastify";
import http from './services/httpServices';
import * as url from './config/urls.json';
import Accounts_demo from './components/common/accounts/items';

export default class Accounts extends Accounts_demo{
    state = {
        items: [],
        modalOpened: false,
        searchModalOpened: false,
        confirmationModalOpened: false,
        searchName: '',
        item: {},
        isEdit: false
    }
    async componentDidMount() {
        await this.load();
    }
// get all accounts
    load = async () => {
        try {
            const {data: items} = await http.get(url.accounts.load_all);
            this.setState({items});
        } catch (e) {
            console.log(e.request)
        }
    }

    // create account
    createItem = async (item) => {
        try{
            const res = await http.post(url.accounts.save_account, {
                accountName: item.accountName,
            });
            await this.load();
            toast.success('Done');
        }catch(err){
            toast.error('Error');
        }
    }

    // update account
    updateItem = async (account) => {
        try{
            const res = await http.put(url.accounts.update_account+'/'+account._id, {
                accountName: account.accountName,
            });
            await this.load();
            toast.success('Done');
        }catch(err){
            toast.error('Error');
        }
    }

    // delete account
    deleteItem = async () => {
        const item = {...this.state.item};
        try{
            await http.delete(url.accounts.update_account+'/'+item._id);
            await this.load();
            toast.success('Done');
        }catch(err){
            toast.error('Error');
        }
    }

    // get account by name
    searchItem = async(name) => {
        this.setState({searchModalOpened: false});
        try{
            const res = await http.get(url.accounts.search+name);
            const items = res.data;
            this.setState({items});
        }catch(err){
            toast.error('Error');
        }
    }

    render(){
       return (<Accounts_demo />);
    }

}