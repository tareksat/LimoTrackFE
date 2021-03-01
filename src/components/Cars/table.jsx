import React from 'react';
import {ImBin} from 'react-icons/im';
import {GrEdit} from 'react-icons/gr';
import {Link} from "react-router-dom";
import {AiOutlineSelect, FcRating} from "react-icons/all";
import {Badge, ButtonGroup, Card} from "react-bootstrap";

export default class Table extends React.Component {
    //const {header, data} = props;
    state = {
        header: [],
        data: []
    }

    componentDidMount() {
    }

    getCurrentPathName = (id) => {
        const path = this.props.paths.filter(p => p._id === id);
        if (path.length > 0) {
            return path[0].pathName
        }
        return '------'
    }

    render() {
        const {header, data} = this.props;

        return (


            <table className='table table-striped  table-bordered' style={{fontSize: 20, textAlign: 'center'}}>
                <thead className='table-dark'>
                <tr style={{textAlign: 'center'}}>
                    <th> Name</th>
                    <th> Plate number</th>
                    <th> Path </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.data.map(car => {
                        return (
                            <tr key={car._id}>
                                <td>{car.info.name}</td>
                                <td>{car.info.platNumber}</td>
                                <td>{this.getCurrentPathName(car.info.path)}</td>
                                <td className='sm'>
                                    <ButtonGroup>
                                        <button
                                            className='btn'
                                            onClick={() => this.props.handleEditButtons(car)}
                                        ><AiOutlineSelect style={{fontSize: 24}}/></button>

                                        <button
                                            className='btn btn-default '
                                            onClick={() => this.props.handleRemoveButton(car)}
                                        >
                                            <ImBin style={{fontSize: 24}}/>
                                        </button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>


        );
    }
}
