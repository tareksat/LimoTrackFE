import React from 'react';
import {GrAdd} from "react-icons/gr";
import {FaDownload, FaPlus} from "react-icons/fa";
import {BsSearch} from "react-icons/bs";

const ControlBar = (props) => (
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
            onClick={() => props.handleBarAction('add')}
        ><FaPlus style={{fontSize: 24}}/>
        </button>

        <button
            className='btn btn-success btn-lg'
            onClick={() => props.handleBarAction('load')}
        ><FaDownload style={{fontSize: 28}}/>
        </button>

        <button
            className='btn btn-info btn-lg'
            onClick={() => props.handleBarAction('search')}
        ><BsSearch style={{fontSize: 28}}/>
        </button>
    </div>
);

export default ControlBar;