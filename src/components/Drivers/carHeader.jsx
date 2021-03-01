import React from 'react';
import {Card, FormControl, InputGroup} from "react-bootstrap";
import {AiFillPhone, RiContactsLine} from "react-icons/all";

const CarHeader = (props) => {

    return (
        <Card style={{margin: 15, padding: 10, width: '95%', boxShadow: "5px 5px 1px #9E9E9E",}}>
            <InputGroup size="lg">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-lg">
                        <RiContactsLine/>
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name='name'
                             value={props.name}
                             onChange={(e) => props.getValues(e.target)}
                />
            </InputGroup>
            <br/>
            <InputGroup size="lg">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-lg">
                        <AiFillPhone/>
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name='phone'
                             value={props.phone}
                             onChange={(e) => props.getValues(e.target)}

                />
            </InputGroup>
        </Card>

    );
}

export default CarHeader;