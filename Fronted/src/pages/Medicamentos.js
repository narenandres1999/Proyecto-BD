import React, { Component } from 'react'
import './Table.css'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
// Import Table :: Components
import TablaMedicamento from "../components/TablaMedicamento";
import FormMedicamento from "../components/Formulario/FormMedicamento";
import Mensaje from '../components/Mensaje';
const ax = require("../api");
class App extends Component {
    state = {
        data: [],
        currentPage: 0,
        modalActualizar: false,
        modalInsertar: false,
        modalMensaje: false,
        hidden: true,
        message: "",
        status: "",
        type: "",
        form: {
            id_med: "",
            med_nombre: "",
            cod_med: "",
            stock: 0,
            fecha_ven: ""
        },
    };
    componentDidMount() {
        this.obtenerDatos();
    }
    // Función que obtiene los datos de medicamentos de la base de datos
    obtenerDatos = () => {
        var string = "";
        this.setState({
            hidden: false
        })
        ax.getMeds().then(res => {
            res.data.map(item => {
                string = item.fecha_ven;
                item.fecha_ven = string.substring(0, 10);
                return null;
            })
            this.setState({
                data: res.data,
                hidden: true
            })
        })
    }
    // Metodo que me permite actualizar la informacion de la tabla
    actualizarTabla = () => {
        this.setState({
            data: []
        })
        setTimeout(this.obtenerDatos(), 3000)
    }
    // Función que hace visible el formulario para actualizar un registro
    // recibe un formulario desde un componente hijo
    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
        });

    };
    // Función que hace visible el formulario de añadir un nuevo registro
    mostrarModalInsertar = () => {
        this.cleanForm();
        this.setState({
            modalInsertar: true,
        });
    };

    // Función que hace visible el mensaje error/success y durara dependiendo del tipo
    mostrarMensaje = () => {
        this.setState({
            modalMensaje: true
        })
        setTimeout(() => {
            this.setState({
                modalMensaje: false
            })
        }, 1000)

    }
    // Función que se cerrara el mensaje si se presiona en la ventana
    cerrarMensaje = () => {
        this.setState({
            modalMensaje: false
        })
    }
    // Función que hace visible la ventana de confirmacion de eliminación
    mostrarModalEliminar = (dato) => {
        this.setState({
            form: dato,
            modalEliminar: true,
        });
    };

    // Función que oculta el formulario de actualización
    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };
    // Función que oculta la ventana de confirmación de eliminación
    cerrarModalEliminar = () => {
        this.setState({ modalEliminar: false });
    };
    // Función que oculta el formulación de añadir registros
    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };
    // Función que limpia los campos del formulario
    cleanForm = () => {
        this.setState({
            form: {
                id_med: 0,
                med_nombre: "",
                cod_med: 0,
                stock: 0,
                fecha_ven: ""
            }
        })
    }
    // Función del botón guardar en el formulario editar registro
    // Recibe un formulario de un componente hijo
    editar = (form) => {
        let body = {
            med_nombre: form.med_nombre,
            cod_med: form.cod_med,
            stock: form.stock,
            fecha_ven: form.fecha_ven
        }
        ax.putMed(form.id_med, body).then((res) => {
            if (!(res.data.errors === undefined)) {
                this.setState({
                    message: res.data.errors[0].msg,
                    status: 300,
                    type: "error"
                })
                this.mostrarMensaje()
            }
            else {
                this.setState({
                    modalActualizar: false,
                    message: res.data.message,
                    status: res.status,
                    type: "success"
                });
                this.mostrarMensaje()
                this.actualizarTabla();
            }
        })
    };
    // Función del botón eliminar en la ventana de eliminación
    eliminar = () => {
        ax.delMed(this.state.form.id_med).then((res) => {
            if (!(res.data.errors === undefined)) {
                this.setState({
                    message: res.data.errors[0].msg,
                    status: res.status,
                    type: "error"
                })
                this.mostrarMensaje()
            }
            else {
                this.setState({
                    modalEliminar: false,
                    message: res.data.message,
                    status: res.status,
                    type: "success"
                });
                this.mostrarMensaje();
                this.actualizarTabla();
            }
        })
    };
    // Función del botón guardar en el formulario añadir registro
    // recibe un formulario de un componente hijo
    insertar = (form) => {
        var body = {
            med_nombre: form.med_nombre,
            cod_med: form.cod_med,
            stock: form.stock,
            fecha_ven: form.fecha_ven
        }
        ax.postMeds(body).then((res) => {
            if (!(res.data.errors === undefined)) {
                this.setState({
                    message: res.data.errors[0].msg,
                    status: 300,
                    type: "error"
                })
                this.mostrarMensaje()
            }
            else {

                this.setState({
                    modalInsertar: false,
                    message: res.data.message,
                    status: res.status,
                    type: "success"
                });
                this.mostrarMensaje();
                this.actualizarTabla();
            }
        })

    }
    // Función que recibe el formulario controlado desde un componente hijo
    handleChild = (form) => {
        this.setState({
            form: form
        })
    }
    render() {

        return (
            <>
                {this.state.modalMensaje &&
                    <Mensaje
                        mostrar={this.state.modalMensaje}
                        status={this.state.status}
                        message={this.state.message}
                        cerrarModal={this.cerrarMensaje}
                        type={this.state.type}
                    />
                }
                <TablaMedicamento
                    hidden={this.state.hidden}
                    list={this.state.data}
                    mostrarAgregar={this.mostrarModalInsertar}
                    mostrarEditar={this.mostrarModalActualizar}
                    mostrarEliminar={this.mostrarModalEliminar}
                />
                {this.state.modalEliminar &&
                    <Modal isOpen={this.state.modalEliminar} style={{ position: 'absolute', top: '45%', right: '50%', transform: 'translate(50%,-50%)' }}>
                        <ModalHeader>
                            <div><h3>Eliminar registro</h3></div>
                            <ModalBody>
                                <p className='text'>¿Esta seguro que desea eliminar este registro?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="secondary"
                                    onClick={() => this.eliminar()}>Eliminar</Button>
                                <Button
                                    color="danger"
                                    onClick={() => this.cerrarModalEliminar()}>Cancelar</Button>
                            </ModalFooter>
                        </ModalHeader>
                    </Modal>
                }
                {this.state.modalActualizar &&
                    <Modal isOpen={this.state.modalActualizar}>
                        <FormMedicamento
                            mostrar={this.state.modalMensaje}
                            status={this.state.status}
                            message={this.state.message}
                            encabezado={"Editar Registro"}
                            handleChild={this.handleChild}
                            item={this.state.form}
                            cerrarModal={this.cerrarModalActualizar}
                            guardar={this.editar}
                        />
                    </Modal>
                }
                {this.state.modalInsertar &&
                    <Modal isOpen={this.state.modalInsertar}>
                        <FormMedicamento
                            item={{
                                id_med: "",
                                med_nombre: "",
                                cod_med: "",
                                stock: 0,
                                fecha_ven: ""
                            }
                            }
                            mostrar={this.state.modalMensaje}
                            status={this.state.status}
                            message={this.state.message}
                            encabezado={"Agregar Medicamentos"}
                            handleChild={this.handleChild}
                            cerrarModal={this.cerrarModalInsertar}
                            guardar={this.insertar}
                        />
                    </Modal>
                }
            </>
        );
    }
}
export default App;
