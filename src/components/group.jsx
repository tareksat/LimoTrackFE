import React from 'react';
import {Link, Redirect, Route} from "react-router-dom";
import Cars from "./Cars/cars";
import Drivers from "./Drivers/drivers";
import Paths from "./paths";
import global from '../services/data';
import {FaCar, FaCarSide, FcBusinessman, GiRoad, MdLocationOn, SiGooglemaps} from "react-icons/all";

const styles = {
    button: {
        fontSize: 38
    }
}

const Group = (props) => {
    return (
        <div
            style={{display: 'flex',
                flexDirection:'row',
                justifyContent: 'space-between',
                marginLeft: -20,
                marginBottom: 0,
                backgroundColor: '#cccccc',
                height: '100vh'
            }}>
            <div style={{backgroundColor: '#cccccc', height: '100vh'}}>
                <div style={{backgroundColor: '#343B3F', height: '100vh', padding: 20}}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        height: '50vh',
                        marginLeft: -5
                    }}>
                        <button
                            className='btn btn-light btn-lg ml-3'
                            onClick={() => {
                                props.history.push('/dashboard/group/cars')
                            }}
                        ><MdLocationOn style={styles.button} />
                        </button>

                        <button
                            className='btn btn-light btn-lg ml-3'
                            onClick={() => {
                                props.history.push('/dashboard/group/cars')
                            }}
                        ><FaCar style={styles.button} />
                        </button>

                        <button
                            className='btn btn-light btn-lg ml-3'
                            onClick={() => {
                                props.history.push('/dashboard/group/drivers')
                            }}
                        ><FcBusinessman style={styles.button} />
                        </button>
                        <button
                            className='btn btn-light btn-lg ml-3'
                            onClick={() => {
                                props.history.push('/dashboard/group/paths')
                            }}
                        ><GiRoad style={styles.button} />
                        </button>

                    </div>


                </div>
            </div>
            <div style={{flexGrow: 5, height: '100vh'}}>
                <Route path='/dashboard/group/cars' component={Cars}/>
                <Route path='/dashboard/group/drivers' component={Drivers}/>
                <Route path='/dashboard/group/paths' component={Paths}/>
                <Redirect from={'/dashboard/group/'} to={'/dashboard/group/cars'} />
            </div>
        </div>
    )
}

export default Group;