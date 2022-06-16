import {
    Modal,
} from "reactstrap";
import './Mensaje.css';
const Mensaje = (props)=>{
return(
    <Modal isOpen = {props.mostrar} className = "mensaje" onClick={()=>{props.cerrarModal()}}>
        <label>Status: {props.status}</label>
        <label>{props.message}</label>
    </Modal>
);
}
export default Mensaje;