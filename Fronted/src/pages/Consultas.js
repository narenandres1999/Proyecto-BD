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
import TablaConsulta from "../components/TablaConsulta";
import FormConsulta from "../components/Formulario/FormConsulta";
import Mensaje from "../components/Mensaje";
const ax = require("../api");
class App extends Component {
    state = {
        data: [],
        optionsMeds: [{
            value: "",
            label: ""
        }],
        hidden: true,
        currentPage: 0,
        totalItems: 0,
        modalMensaje: false,
        message: "",
        status: "",
        type: "",
        consultaActual: 0,
        modalActualizar: false,
        modalInsertar: false,
        form: {
            num_consulta: "",
            nombre: "",
            cod_paciente: "",
            genero: null,
            telefono: "",
            motivo: "",
            fecha_consulta: "",
            encargado: "",
            medicamentos: []
        },
    };

    componentDidMount() {
        this.obtenerDatos();
        this.optionMed();

    }
    optionMed = () => {
        ax.getMeds().then((res) => {
            let options = [];
            let json = {};
            res.data.map((item) => {
                json = { "value": item, "label": item.med_nombre };
                options.push(json)
            })
            this.setState({
                optionsMeds: options
            })
        })
    }
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
    cerrarMensaje = () => {
        this.setState({
            modalMensaje: false
        })
    }
    obtenerDatos = () => {
        this.setState({
            hidden: false
        })
        ax.getCons().then(res => {
            var string = "";
            res.data.items.map(item => {
                string = item.fecha_consulta;
                item.fecha_consulta = string.substring(0, 10);
            })
            this.setState({
                data: res.data.items,
                totalItems: res.data.total,
                hidden: true
            })
        })
    }
    actualizarTabla = () => {
        this.setState({
            data: []
        })
        setTimeout(this.obtenerDatos(), 3000)
    }
    mostrarModalActualizar = (dato) => {
        ax.getMedCons(dato.num_consulta).then(res => {
            dato.medicamentos = res.data;
            this.setState({
                form: dato,
                modalActualizar: true,
            });
        })

    };

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
                num_consulta: "",
                nombre: "",
                cod_paciente: "",
                genero: null,
                telefono: "",
                motivo: "",
                fecha_consulta: "",
                encargado: ""
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
        const body = {
            "encargado": form.encargado,
            "motivo": form.motivo,
            "fecha_consulta": form.fecha_consulta,
            "cod_paciente": form.cod_paciente,
            "genero": form.genero,
            "nombre": form.nombre,
            "telefono": form.telefono
        }
        ax.putCons(form.num_consulta, body).then((res) => {
            if (!(res.data.errors === undefined)) {
                this.setState({
                    message: res.data.errors[0].msg,
                    status: res.status,
                    type: "error"
                })
            }
            else {
                ax.delMedCons(form.num_consulta).then((res) => {
                    if (!(res.data.errors === undefined)) {
                        this.setState({
                            message: res.data.errors[0].msg,
                            status: res.status,
                            type: "error"
                        })
                    }
                    else {
                        if (form.medicamentos.length > 0) {
                            form.medicamentos.map(item => {

                                const med = {
                                    id_med: item.id_med,
                                    cantidad: item.cantidad
                                }
                                ax.postMedCons(form.num_consulta, med).then(res => {
                                    if (!(res.data.errors === undefined)) {
                                        this.setState({
                                            message: res.data.errors[0].msg,
                                            status: res.status,
                                            type: "error"
                                        })
                                    }
                                })
                            })
                        }
                    }
                })
                this.setState({
                    modalActualizar: false,
                    message: res.data.message,
                    status: res.status,
                    type: "success"
                });

                this.actualizarTabla()

            }
            this.mostrarMensaje()
        })

    };

    eliminar = () => {
        ax.delCons(this.state.form.num_consulta).then((res) => {
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
                    modalEliminar: false,
                    message: res.data.message,
                    status: res.status,
                    type: "success"
                });
                this.mostrarMensaje();
                this.cleanForm();
                this.actualizarTabla();
            }
        })
    };

    insertar = (form) => {
        const body = {
            "encargado": form.encargado,
            "motivo": form.motivo,
            "fecha_consulta": form.fecha_consulta,
            "cod_paciente": form.cod_paciente,
            "genero": form.genero,
            "nombre": form.nombre,
            "telefono": form.telefono
        }
        ax.postCons(body).then((res) => {
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
                    ...this.state,
                    consultaActual: res.data.num_consulta.max
                })
                if (form.medicamentos.length > 0) {
                    ax.delMedCons(this.state.consultaActual).then(() => {
                        form.medicamentos.map(item => {

                            const med = {
                                id_med: item.id_med,
                                cantidad: item.cantidad
                            }
                            ax.postMedCons(this.state.consultaActual, med)

                        })
                    })
                }
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
    obtenerFormulario = (form) => {
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
                <TablaConsulta
                    hidden={this.state.hidden}
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
                    <FormConsulta
                        optionsMed={this.state.optionsMeds}
                        encabezado={"Editar Registro"}
                        obtenerFormulario={this.obtenerFormulario}
                        item={this.state.form}
                        cerrarModal={this.cerrarModalActualizar}
                        guardar={this.editar}
                    />
                </Modal>
                <Modal isOpen={this.state.modalInsertar}>
                    <FormConsulta
                        item={{
                            num_consulta: "",
                            nombre: "",
                            cod_paciente: "",
                            genero: null,
                            telefono: "",
                            motivo: "",
                            fecha_consulta: "",
                            encargado: "",
                            medicamentos: []
                        }
                        }
                        optionsMed={this.state.optionsMeds}
                        encabezado={"Agregar Consultas"}
                        obtenerFormulario={this.obtenerFormulario}
                        cerrarModal={this.cerrarModalInsertar}
                        guardar={this.insertar}
                    />
                </Modal>
            </>
        );
    }
}
export default App;
