import React from 'react';
import Modal from 'react-modal';
import {Card} from "react-bootstrap";
import global from "../../services/data";

const ConfirmationModal = (props) => {
    return(
        <Modal
            isOpen={props.isOpen}
            contentLabel='Confirm'
            ariaHideApp={false}
            style={customStyles}
        >
            <Card  style={{padding: 20, backgroundColor: '#f4f4f4'}}>
                <h2>{global.language==='EN'? 'Confirm delete?': 'تأكيد المسح ؟'}</h2>
                <button
                    className='btn btn-danger btn-block'
                    onClick={()=>props.close(true)}
                >{global.language==='EN'? 'Confirm': 'تأكيد'}</button>
                <button
                    className='btn btn-success btn-block'
                    onClick={()=>props.close(false)}
                >{global.language==='EN'? 'Cancel': 'إلغاء'}</button>
            </Card>

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
        opacity: 0.9,
        padding: 0,
        boxShadow: "5px 5px 1px #9E9E9E"
    }
};

export default ConfirmationModal;