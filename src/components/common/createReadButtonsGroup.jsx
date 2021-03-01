import React from 'react';
import {GrAdd} from "react-icons/gr";
import {FaDownload} from "react-icons/fa";
import {BsSearch} from "react-icons/bs";

const CreateReadButtonsGroup = (props) => (
    <div
        className='alert'
        style={{ display: "flex",
            flexDirection:"row-reverse",
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 2
        }}>
        <button
            className='btn btn-warning btn-lg'
            onClick={() => props.add()}
        ><GrAdd style={{fontSize: 28}}/>
        </button>

        <button
            className='btn btn-dark btn-lg'
            onClick={() => props.load()}
        ><FaDownload style={{fontSize: 28}}/>
        </button>

        <button
            className='btn btn-info btn-lg'
            onClick={() => props.search()}
        ><BsSearch style={{fontSize: 28}}/>
        </button>
    </div>
);

export default CreateReadButtonsGroup;