import {ToastContainer} from 'react-toastify';
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from './components/login';
import Dashboard from "./components/dashboard";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div style={{
            backgroundColor: '#cccccc',
            height:'100vh',
            margin: 0
        }}>
            <ToastContainer/>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Redirect from='/' exact to="/login"/>
            </Switch>


        </div>
    );
}

export default App;
