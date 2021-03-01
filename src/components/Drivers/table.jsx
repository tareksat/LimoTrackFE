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

    render() {
        const {header, data} = this.props;

        return (


            <table className='table table-striped  table-bordered' style={{fontSize: 20, textAlign: 'center'}}>
                <thead className='table-dark'>
                <tr style={{textAlign: 'center'}}>
                    <th> name</th>
                    <th> phone</th>
                    <th> car</th>
                    <th> rating</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.data.map(driver => {
                        return (
                            <tr key={driver._id}>
                                <td>{driver.name}</td>
                                <td>{driver.phone}</td>
                                <td>{driver.car}</td>
                                <td>
                                    <Badge pill
                                           variant={
                                               driver.rating>3.5?"success"
                                                   :driver.rating >2? 'warning':'danger'}
                                    >
                                        {parseFloat(driver.rating).toFixed(1)}
                                    </Badge>
                                </td>
                                <td className='sm'>
                                    <ButtonGroup>
                                        <button
                                            className='btn'
                                            onClick={() => this.props.rate(driver)}
                                        ><FcRating style={{fontSize: 24}}/></button>

                                        <button
                                            className='btn'
                                            onClick={() => this.props.handleEditButtons(driver)}
                                        ><AiOutlineSelect style={{fontSize: 24}}/></button>

                                        <button
                                            className='btn btn-default '
                                            onClick={() => this.props.handleRemoveButton(driver)}
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
