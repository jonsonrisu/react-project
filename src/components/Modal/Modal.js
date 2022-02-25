import {React }from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Register from "../Register";

const Modals = props => {

    if(props.show==false){
        return null;
    }
        return (
            <Modal show={props.show}>
            <Modal.Body>
               <Register setUserData={props.show}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.onClose}>Close Modal</Button>
            </Modal.Footer>
          </Modal>
        );
};
export default Modals;