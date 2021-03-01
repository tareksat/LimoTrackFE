import React from 'react';
import {Card, Dropdown, FormControl, InputGroup} from "react-bootstrap";
import {AiFillPhone, IoCarSportOutline, RiContactsLine} from "react-icons/all";

const DriversHeader = (props) => {
    return (
        <Card style={{margin: 15, padding: 10, width: '95%', boxShadow: "5px 5px 1px #9E9E9E",}}>
            <InputGroup size="lg">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-lg">
                        <IoCarSportOutline/>
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name='name'
                             value={props.name}
                             onChange={(e) => props.getValues(e.target)}
                />
            </InputGroup>
            <br/>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {props.selectedPath}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey={'All'}
                                   onSelect={(e) => {
                                       props.setSelectedPath(e);
                                   }}
                    >All</Dropdown.Item>

                    <Dropdown.Item eventKey={'----'}
                                   onSelect={(e) => {
                                       props.setSelectedPath(e);
                                   }}
                    >------</Dropdown.Item>

                    {props.paths.map(path=>{
                        return(
                            <Dropdown.Item eventKey={path.pathName}
                                onSelect={(e) => {
                                    props.setSelectedPath(e);
                                }}
                            >{path.pathName}</Dropdown.Item>
                        )
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </Card>

    );
}

export default DriversHeader;