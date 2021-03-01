import React from 'react';
import {ImBin} from 'react-icons/im';
import {GrEdit} from 'react-icons/gr';
import {Link} from "react-router-dom";
import {AiOutlineSelect} from "react-icons/all";
import {ButtonGroup} from "react-bootstrap";

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
            <table className='table table-striped  table-bordered' style={{fontSize: 20}}>
                <thead className='table-dark'>
                <tr style={{textAlign: 'center'}}>
                    {header.map(head => {
                        return (<th key={head}>{head}</th>)
                    })}

                </tr>
                </thead>
                <tbody>
                {data.map(d => {
                    return (
                        <tr key={d._id} style={{textAlign: 'left'}}>
                            {Object.keys(d).map(key => {
                                if (key !== '_id') {
                                    return (
                                        <td key={d[key]}>
                                            {d[key]}
                                        </td>
                                    );
                                }
                            })}

                            <td>
                                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                <button
                                    className='btn btn-default '
                                    onClick={() => this.props.handleTableButton({type: 'link', payload: d})}
                                ><AiOutlineSelect style={{fontSize: 24}}/>
                                </button>

                                <button
                                    className='btn btn-default '
                                    onClick={() => this.props.handleTableButton({type: 'edit', payload: d})}
                                ><GrEdit style={{fontSize: 24}}/>
                                </button>

                                <button
                                    className='btn btn-default '
                                    onClick={() => this.props.handleTableButton({type: 'remove', payload: d})}
                                >
                                    <ImBin style={{fontSize: 24}}/>
                                </button>
                                </div>
                            </td>

                        </tr>
                    )
                })}
                </tbody>
            </table>
        );
    }
}
