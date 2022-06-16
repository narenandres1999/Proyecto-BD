import { useState } from "react";
import {
    Modal,
} from "reactstrap";
import './Mensaje.css';

import {BiErrorCircle} from 'react-icons/bi'
import {AiOutlineCheckCircle} from 'react-icons/ai'
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
        <BiErrorCircle />
        </div>
        <div hidden = {successLogo}>
        <AiOutlineCheckCircle />
        </div>
        <label >   Status: {props.status}</label>
        <label>{props.message}</label>
    </Modal>

);
}
export default Mensaje;