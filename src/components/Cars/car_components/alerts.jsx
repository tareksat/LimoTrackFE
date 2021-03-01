import React from "react";
import Input from "../../common/input";

const Alerts = (props) => {
    const {data: alertSettings} = props;
    return (
        <div style={{margin: 10}}>

            <table className='table table-bordered table-striped'>
                <tr>
                    <td>Engine ON</td>
                    <td style={{textAlign: 'center'}}>
                        <input
                            name='engineON'
                            type='checkbox'
                            style={{height: 20, width: 20}}
                            checked={alertSettings.engineON}
                            onChange={(e) =>{
                                const res = {name: e.target.name, value: e.target.checked}
                                props.handleCarAlertsInputs(res);
                            }}
                        />
                    </td>

                </tr>

                <tr>
                    <td>Engine OFF</td>
                    <td style={{textAlign: 'center'}}>
                        <input
                            name='engineOFF'
                            type='checkbox'
                            style={{height: 20, width: 20}}
                            checked={alertSettings.engineOFF}
                            onChange={(e) =>{
                                const res = {name: e.target.name, value: e.target.checked}
                                props.handleCarAlertsInputs(res);
                            }}
                        />
                    </td>
                </tr>

                <tr>
                    <td>Door Opened</td>
                    <td style={{textAlign: 'center'}}>
                        <input
                            name='doorOpen'
                            type='checkbox'
                            style={{height: 20, width: 20}}
                            checked={alertSettings.doorOpen}
                            onChange={(e) =>{
                                const res = {name: e.target.name, value: e.target.checked}
                                props.handleCarAlertsInputs(res);
                            }}
                        />
                    </td>
                </tr>

                <tr>
                    <td>DoorClosed</td>
                    <td style={{textAlign: 'center'}}>
                        <input
                            name='doorClosed'
                            type='checkbox'
                            style={{height: 20, width: 20}}
                            checked={alertSettings.doorClosed}
                            onChange={(e) =>{
                                const res = {name: e.target.name, value: e.target.checked}
                                props.handleCarAlertsInputs(res);
                            }}
                        />
                    </td>
                </tr>

                <tr>
                    <td>Fuel Leak</td>
                    <td style={{textAlign: 'center'}}>
                        <input
                            name='fuelLeak'
                            type='checkbox'
                            style={{height: 20, width: 20}}
                            checked={alertSettings.fuelLeak}
                            onChange={(e) =>{
                                const res = {name: e.target.name, value: e.target.checked}
                                props.handleCarAlertsInputs(res);
                            }}
                        />
                    </td>
                </tr>

                <tr>
                    <td>Refuel</td>
                    <td style={{textAlign: 'center'}}>
                        <input
                            name='refuel'
                            type='checkbox'
                            style={{height: 20, width: 20}}
                            checked={alertSettings.refuel}
                            onChange={(e) =>{
                                const res = {name: e.target.name, value: e.target.checked}
                                props.handleCarAlertsInputs(res);
                            }}
                        />
                    </td>
                </tr>

                <tr>
                    <td>Speed alert</td>
                    <td style={{textAlign: 'center'}}>
                        <input
                            name='speedAlert'
                            type='checkbox'
                            style={{height: 20, width: 20}}
                            checked={alertSettings.speedAlert}
                            onChange={(e) =>{
                                const res = {name: e.target.name, value: e.target.checked}
                                props.handleCarAlertsInputs(res);
                            }}
                        />
                    </td>
                </tr>

                <tr>
                    <td>Speed Limit</td>
                    <td style={{textAlign: 'center'}}>
                        <input
                            name='speedLimit'
                            type='number'
                            style={{width: 60}}
                            value={alertSettings.speedLimit}
                            onChange={(e) => props.handleCarAlertsInputs(e.target)}
                        />
                    </td>
                </tr>

                <tr>
                    <td>GeoFence</td>
                    <td style={{textAlign: 'center'}}>
                        <input
                            name='geoFence'
                            type='checkbox'
                            style={{height: 20, width: 20}}
                            checked={alertSettings.geoFence}
                            onChange={(e) =>{
                                const res = {name: e.target.name, value: e.target.checked}
                                props.handleCarAlertsInputs(res);
                            }}
                        />

                    </td>
                </tr>


            </table>


        </div>
    );
}

export default Alerts;