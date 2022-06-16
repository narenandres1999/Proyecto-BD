import { useState } from "react";
import {
    Modal,
} from "reactstrap";
import './Mensaje.css';

import {GrClose,GrCheckmark} from 'react-icons/gr'

const Mensaje = (props)=>{
    const type = `modal-content-msg mensaje-${props.type}`;
    let errorLogo = true;
    let successLogo = true;
    if (props.type === "error"){
        errorLogo = false;
        successLogo = true;
    }
    else{
        successLogo = false;
        errorLogo = true;
    }
    // 2 Opciones 
    // success
    // error
return(

    <Modal isOpen = {props.mostrar} className={type} onClick={()=>{props.cerrarModal()}}>
        <div hidden = {errorLogo}>
        <GrClose />
        </div>
        <div hidden = {successLogo}>
        <GrCheckmark />
        </div>
        <div className='modal-text'>
        <label className='title'>Status: {props.status}</label>
        <label>{props.message}</label>
        </div>
    </Modal>

);
}
export default Mensaje;