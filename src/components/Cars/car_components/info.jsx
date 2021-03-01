import React from "react";
import Input from "../../common/input";
import {Dropdown} from "react-bootstrap";

const Info = (props) => {
    console.log(props);
    const {data: info} = props;
    const carPath = getCurrentPathName(info.path, props.paths)
    return (
        <div style={{margin: 10}}>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Input
                    label='name'
                    name='name'
                    value={info.name}
                    onChange={props.handleCarInfoInputs}
                />
                <Input
                    label='plate number'
                    name='platNumber'
                    value={info.platNumber}
                    onChange={props.handleCarInfoInputs}
                />

            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Input
                    label='Fuel rate'
                    name='fuelConsumptionRate'
                    type='number'
                    value={info.fuelConsumptionRate}
                    onChange={props.handleCarInfoInputs}
                />
                <Input
                    label='Device'
                    name='gpsDevice'
                    value={info.gpsDevice}
                    onChange={props.handleCarInfoInputs}
                />
            </div>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Input
                    label='Activation date'
                    name='activationDate'
                    type='date'
                />
                <Input
                    label='Expiration date'
                    name='expirationDate'
                    type='date'
                />

            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Input
                    label='SIM number'
                    name='simNumber'
                    value={info.simNumber}
                    onChange={props.handleCarInfoInputs}
                />
                <Input
                    label='VIN'
                    name='vin'
                    value={info.vin}
                    onChange={props.handleCarInfoInputs}
                />
            </div>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Input
                    label='Engine Number'
                    name='engineNumber'
                    value={info.engineNumber}
                    onChange={props.handleCarInfoInputs}
                />

                <div className="form-group">
                    <label htmlFor='color'>color</label>
                    <input
                        className="form-control"
                        id='color'
                        name='color'
                        type='color'
                        style={{width: 190}}
                        value={info.color}
                        onChange={(e) => props.handleCarInfoInputs(e.target)}
                    />
                </div>

            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Input
                    label='Tank size'
                    name='tankSize'
                    type='number'
                    value={info.tankSize}
                    onChange={props.handleCarInfoInputs}
                />

                <Dropdown style={{marginTop: 30}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {carPath}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item
                            onSelect={(e) => {
                                const res = {name: 'path', value: ''}
                                props.handleCarInfoInputs(res);
                            }}
                        >
                            ---
                        </Dropdown.Item>
                        {props.paths.map(path => {
                            return (
                                <Dropdown.Item
                                    key={path._id}
                                    eventKey={path._id}
                                    onSelect={(e) => {
                                        const res = {name: 'path', value: e}
                                        props.handleCarInfoInputs(res);
                                    }}
                                >{path.pathName}</Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>

            </div>


        </div>
    );
}

const getCurrentPathName = (id, paths) => {
    const path = paths.filter(p => p._id === id);
    if (path.length > 0) {
        return path[0].pathName
    }
    return 'Path name'
}
export default Info;