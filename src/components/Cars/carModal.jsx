import React from "react";
import Modal from "react-modal";
import {Card, FormControl, InputGroup, Tab, Tabs} from "react-bootstrap";
import {AiFillCar, AiFillPhone, GrLocation, RiContactsLine} from "react-icons/all";
import {VscDiscard} from "react-icons/vsc";
import {GiSave} from "react-icons/gi";
import Info from "./car_components/info";
import Installation from "./car_components/installation";
import Alerts from "./car_components/alerts";

const CarModal = (props) => {
    const {info, installation, alertSettings} = props.car;
    return (
        <Modal
            isOpen={props.isOpen}
            contentLabel='ItemModal'
            ariaHideApp={false}
            style={customStyles}
        >

            <div style={{margin: 15, padding: 10, width: '95%'}}>
                <Tabs defaultActiveKey="Info">
                    <Tab eventKey="Info" title="Info">
                        <Info
                            data={info}
                            paths={props.paths}
                            handleCarInfoInputs={props.handleCarInfoInputs}
                        />
                    </Tab>
                    <Tab eventKey="Setup" title="Setup">
                        <Installation
                            data={installation}
                            handleInstallationInputs={props.handleInstallationInputs}
                        />
                    </Tab>
                    <Tab eventKey="Alerts" title="Alerts">
                        <Alerts
                            data={alertSettings}
                            handleCarAlertsInputs={props.handleCarAlertsInputs}
                        />
                    </Tab>
                </Tabs>
            </div>
            <div style={{display: "flex", justifyContent: 'space-around'}}>
                <button
                    className='btn btn-info btn-lg'
                    onClick={() => props.handleModalButtons(true)}>
                    <GiSave style={{fontSize: 28}}/>
                </button>
                <button className='btn btn-danger btn-lg'
                        onClick={() => props.handleModalButtons(false)}>
                    <VscDiscard style={{fontSize: 28}}/>
                </button>
            </div>
        </Modal>
    );
}
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        opacity: 1,
        padding: 0,
        boxShadow: "5px 5px 1px #9E9E9E",
        height: '99vh',
        width: '50%'
    }
};
export default CarModal;