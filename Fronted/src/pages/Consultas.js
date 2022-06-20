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
import FormConsulta from "../components/forms/FormConsulta";
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
    // Función que me crea las opciones que tendrá el selccion en
    // el formulario de editar/añadir registros
    optionMed = () => {
        ax.getMeds().then((res) => {
            let options = [];
            let json = {};
            let parseDate = ""
            res.data.map((item) => {
                parseDate = item.fecha_ven
                item.fecha_ven = parseDate.substring(0, 10)
                json = { "value": item, "label": item.med_nombre };
                options.push(json)
                return null;
            })
            this.setState({
                optionsMeds: options
            })
        })
    }
    // Función que muestra un mensaje de error/success
    mostrarMensaje = (type) => {
        this.setState({
            modalMensaje: true
        })
        let time = 3000;
        if (type === "success") {
            time = 1000;
        }
        setTimeout(() => {
            this.setState({
                modalMensaje: false
            })
        }, time)

    }
    // Función que cierra el mensaje de error/success con un click
    cerrarMensaje = () => {
        this.setState({
            modalMensaje: false
        })
    }
    // Función que obtiene las consultas y sus medicamentos respectivos
    obtenerDatos = () => {
        this.setState({
            hidden: false
        })
        ax.getCons().then(res => {
            var string = "";
            res.data.items.map(item => {
                string = item.fecha_consulta;
                item.fecha_consulta = string.substring(0, 10);

                ax.getMedCons(item.num_consulta).then(result => {
                    let parseDate = "";
                    result.data.map(item => {
                        parseDate = item.fecha_ven;
                        item.fecha_ven = parseDate.substring(0, 10);
                        return null;
                    })
                    item.medicamentos = result.data
                })
                return null;
            })
            this.setState({
                data: res.data.items,
                totalItems: res.data.total,
                hidden: true
            })
        })
    }
    // Función que actualiza la información de la tabla
    actualizarTabla = () => {
        this.setState({
            data: []
        })
        setTimeout(this.obtenerDatos(), 3000)
    }
    // Función que muestra el formulario de editar registros
    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
        });

    };
    // Función que muestra la ventana de confirmación de eliminación
    mostrarModalEliminar = (dato) => {
        this.setState({
            form: dato,
            modalEliminar: true,
        });
    };
    // Función que oculta el formulario de editar registros
    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };
    // Función que oculta la ventana de confirmación de eliminación
    cerrarModalEliminar = () => {
        this.setState({ modalEliminar: false });
    };
    // Función que me limpia los campos del formulario
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
    // Función que muestra el formulario de añadir registros
    mostrarModalInsertar = () => {
        this.cleanForm();
        this.setState({
            modalInsertar: true,
        });
    };
    // Función que oculta el formulario de añadir registros
    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };
    // Función del botón guardar en el formulario editar registros
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
                                    this.actualizarTabla()
                                })
                                return null;
                            })
                        }
                    }
                    this.setState({
                        modalActualizar: false,
                        message: "Se ha modificado con exito ",
                        status: 200,
                        type: "success"
                    });
                    this.actualizarTabla()
                })
            }
            setTimeout(() => { this.mostrarMensaje(this.state.type) }, 50)
        })

    };
    // Función del botón eliminar en la ventana de confirmación de eliminación
    eliminar = () => {
        ax.delCons(this.state.form.num_consulta).then((res) => {
            if (!(res.data.errors === undefined)) {
                this.setState({
                    message: res.data.errors[0].msg,
                    status: 300,
                    type: "error"
                })
                this.mostrarMensaje("error")
            }
            else {
                this.setState({
                    modalEliminar: false,
                    message: res.data.message,
                    status: res.status,
                    type: "success"
                });
                this.mostrarMensaje("success");
                this.cleanForm();
                this.actualizarTabla();
            }
        })
    };
    // Función del botón guardar en el formulario de añadir registros
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
                this.mostrarMensaje("error")
            }
            else {
                new Promise((resolve) => {
                    this.setState({
                        ...this.state,
                        consultaActual: res.data.num_consulta.max
                    })
                    setTimeout(() => {
                        resolve("done")
                    }, 50);
                }).then(() => {
                    console.log(this.state.consultaActual)
                    if (form.medicamentos.length > 0) {
                        form.medicamentos.map(item => {
                            const med = {
                                id_med: item.id_med,
                                cantidad: item.cantidad
                            }
                            ax.postMedCons(this.state.consultaActual, med).then(res => {
                                if (!(res.data.errors === undefined)) {
                                    this.setState({
                                        message: res.data.errors[0].msg,
                                        status: res.status,
                                        type: "error"
                                    })
                                }
                                this.actualizarTabla();
                            })
                            return null;
                        })
                    }
                    this.setState({
                        modalInsertar: false,
                        message: res.data.message,
                        status: res.status,
                        type: "success"
                    });
                    setTimeout(() => { this.mostrarMensaje(this.state.type); }, 50)
                })

            }
        })
    }

    // Función que obtiene el formulario controlado desde un componente hijo
    obtenerFormulario = (form) => {
        this.setState({
            form: form
        })
    }
    // Función que obtiene la información del mensaje de un componente nieto (AddMedicamentos)
    obtenerMensaje = (propsMensaje) => {
        this.setState({
            message: propsMensaje.message,
            status: propsMensaje.status,
            type: propsMensaje.type
        })
        this.mostrarMensaje()

    }
    render() {

        return (
            <>
            <div className='pt-5'>
            {this.state.modalMensaje &&
                <Mensaje
                    mostrar={this.state.modalMensaje}
                    status={this.state.status}
                    message={this.state.message}
                    cerrarModal={this.cerrarMensaje}
                    type={this.state.type}
                />}
                <TablaConsulta
                    hidden={this.state.hidden}
                    list={this.state.data}
                    mostrarAgregar={this.mostrarModalInsertar}
                    mostrarEditar={this.mostrarModalActualizar}
                    mostrarEliminar={this.mostrarModalEliminar}
                />
                {this.state.modalEliminar &&
                    <Modal isOpen={this.state.modalEliminar} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                        <ModalHeader>
                            <div><h3>Eliminar registro</h3></div>
                        </ModalHeader>
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

                    </Modal>
                }
                {this.state.modalActualizar &&
                    <Modal isOpen={this.state.modalActualizar}>
                        <FormConsulta
                            obtenerMensaje={this.obtenerMensaje}
                            optionsMed={this.state.optionsMeds}
                            encabezado={"Editar Registro"}
                            obtenerFormulario={this.obtenerFormulario}
                            item={this.state.form}
                            cerrarModal={this.cerrarModalActualizar}
                            guardar={this.editar}
                        />
                    </Modal>
                }
                {this.state.modalInsertar &&
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
                            obtenerMensaje={this.obtenerMensaje}
                            optionsMed={this.state.optionsMeds}
                            encabezado={"Agregar Consultas"}
                            obtenerFormulario={this.obtenerFormulario}
                            cerrarModal={this.cerrarModalInsertar}
                            guardar={this.insertar}
                        />
                    </Modal>
                }
                </div>
            </>
        );
    }
}
export default App;
