import React from "react";
import Modal from "react-modal";
import {Card, FormControl, InputGroup} from "react-bootstrap";
import {AiFillCar, AiFillPhone, GrLocation, RiContactsLine} from "react-icons/all";
import {VscDiscard} from "react-icons/vsc";
import {GiSave} from "react-icons/gi";

const DriverModal = (props) => {

    return(
      <Modal
          isOpen={props.isOpen}
          contentLabel='ItemModal'
          ariaHideApp={false}
          style={customStyles}
      >

          <Card style={{margin: 15, padding: 10, width: '95%'}}>
              <InputGroup size="lg">
                  <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-lg">
                          <RiContactsLine/>
                      </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name='name'
                               value={props.driver.name}
                               onChange={(e) => props.handleDriverModalInputs(e.target)}
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
                               value={props.driver.phone}
                               onChange={(e) => props.handleDriverModalInputs(e.target)}

                  />
              </InputGroup>

              <br/>

              <InputGroup size="lg">
                  <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-lg">
                          <GrLocation/>
                      </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name='address'
                               value={props.driver.address}
                               onChange={(e) => props.handleDriverModalInputs(e.target)}

                  />
              </InputGroup>

              <br/>

              <InputGroup size="lg">
                  <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-lg">
                          <AiFillCar/>
                      </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name='car'
                               value={props.driver.car}
                               onChange={(e) => props.handleDriverModalInputs(e.target)}

                  />
              </InputGroup>

              <div style={{display: "flex", justifyContent: 'space-between'}}>
                  <button
                      className='btn btn-info mt-3'
                      onClick={() => props.handleModalButtons(true)}>
                      <GiSave style={{fontSize: 28}}/>
                  </button>
                  <button className='btn btn-danger mt-3'
                          onClick={() => props.handleModalButtons(false)}>
                      <VscDiscard style={{fontSize: 28}}/>
                  </button>
              </div>

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
export default DriverModal;