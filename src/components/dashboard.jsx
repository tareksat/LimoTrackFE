import React, {Component} from "react";
import {Redirect, Route} from 'react-router-dom';
import Top_bar from "./navbar";
import Accounts from "./accounts";
import Groups from "./groups";
import Group from './group';
import global from "../services/data";

const Dashboard = (props) => {
    if(!global.currentUser){
        props.history.replace('/login');
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: '100vh',
        }}>
            <Top_bar/>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                height: '100vh'
            }}>
                <Route path='/dashboard/accounts' exact component={Accounts}/>
                <Route path='/dashboard/groups' exact component={Groups}/>
                <Route path="/dashboard/group" component={Group}/>
                <Redirect from='/dashboard' to={'/dashboard/accounts'}/>

            </div>

        </div>
    );
}

export default Dashboard;