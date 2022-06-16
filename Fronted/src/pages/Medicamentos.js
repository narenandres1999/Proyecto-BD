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
    obtenerDatos = () => {
        var string = "";
        ax.getMeds().then(res => {
            res.data.map(item => {
                string = item.fecha_ven;
                item.fecha_ven = string.substring(0, 10);
            })
            this.setState({ data: res.data })
        })
    }
    actualizarTabla = () => {
        this.setState({
            data: []
        })
        setTimeout(this.obtenerDatos(), 3000)
    }
    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
        });

    };
    mostrarMensaje = () => {
        this.setState({
            modalMensaje: true
        })
        /*
        setTimeout(() => {
            this.setState({
                modalMensaje: false
            })
        }, 2000)
        */

    }
    cerrarMensaje = () => {
        this.setState({
            modalMensaje: false
        })
    }
    mostrarModalEliminar = (dato) => {
        this.setState({
            form: dato,
            modalEliminar: true,
        });
    };
    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };
    cerrarModalEliminar = () => {
        this.setState({ modalEliminar: false });
    };
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
    mostrarModalInsertar = () => {
        this.cleanForm();
        this.setState({
            modalInsertar: true,
        });
    };

    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };
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
    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };
    handleChild = (form) => {
        this.setState({
            form: form
        })
    }
    render() {

        return (
            <>
                <Mensaje
                    mostrar={this.state.modalMensaje}
                    status={this.state.status}
                    message={this.state.message}
                    cerrarModal={this.cerrarMensaje}
                    type={this.state.type}
                />
                <TablaMedicamento
                    list={this.state.data}
                    mostrarAgregar={this.mostrarModalInsertar}
                    mostrarEditar={this.mostrarModalActualizar}
                    mostrarEliminar={this.mostrarModalEliminar}
                />
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
            </>
        );
    }
}
export default App;
