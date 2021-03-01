import React from "react";
import Input from "../../common/input";

const Installation = (props) => {
    const {data: installation} = props;
    return (
        <div style={{margin: 10}}>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Input
                    label='InstalledBy'
                    name='installedBy'
                    value={installation.installedBy}
                    onChange={props.handleInstallationInputs}
                />
                <Input
                    label='Time'
                    name='time'
                    type='date'
                    value={installation.time}
                    onChange={props.handleInstallationInputs}
                />

            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Input
                    label='Company'
                    name='company'
                    value={installation.company}
                    onChange={props.handleInstallationInputs}
                />
                <Input
                    label='Location'
                    name='location'
                    value={installation.location}
                    onChange={props.handleInstallationInputs}
                />
            </div>

            <p>photos</p>
            <input
                className="form-control"
                id='photos'
                name='photos'
                type='file'
                accept='image/*'
                onChange={(e) => {
                    props.handleInstallationInputs(e.target)
                }}
            />
        </div>
    );
}

export default Installation;