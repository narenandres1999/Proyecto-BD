import React, { Component } from 'react'
import '../Table.css'
import { MdEdit, MdDelete } from "react-icons/md";
import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import FormEditar from "./components/FormEditar"
const ax = require("../../api");
class App extends Component {
    state = {
        data: [],
        currentpage: 0,
        limitItems: 10,
        totalItems: 0,
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
            medicamentos:[]
        },
    };



    componentDidMount() {

        ax.getCons().then(res => {
            var string = "";
            res.data.items.map(item => {
                string = item.fecha_consulta;
                item.fecha_consulta = string.substring(0, 10);
            })
            this.setState({
                data: res.data.items,
                totalItems: res.data.total,
            })
        })
    }
    mostrarModalActualizar = (dato) => {
        ax.getMedCons(dato.num_consulta).then(res=>{
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
        console.log(this.state.form)
        const body = {
            "encargado": form.encargado,
            "motivo": form.motivo,
            "fecha_consulta": form.fecha_consulta,
            "cod_paciente": form.cod_paciente,
            "genero": form.genero,
            "nombre": form.nombre,
            "telefono": form.telefono
        }
        ax.putCons(form.num_consulta, body)
        this.setState({ modalActualizar: false });
        window.location.reload();
    };

    eliminar = () => {
        ax.delCons(this.state.form.num_consulta)
        this.setState({ modalEliminar: false });
        window.location.reload();
    };

    insertar = (form) => {
        console.log(this.state.form)
        const body = {
            "encargado": form.encargado,
            "motivo": form.motivo,
            "fecha_consulta": form.fecha_consulta,
            "cod_paciente": form.cod_paciente,
            "genero": form.genero,
            "nombre": form.nombre,
            "telefono": form.telefono
        }
        ax.postCons(body)
        this.setState({ modalInsertar: false });
        window.location.reload();
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
            form:form
        })
    }
    render() {

        return (
            <>
                <h3>Gestor de consultas</h3>
                <Button color="danger" onClick={() => this.mostrarModalInsertar()}>Agregar consultas</Button>
                <Container>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Codigo de estudiante</th>
                                <th>Genero</th>
                                <th>Telefono</th>
                                <th>Motivo</th>
                                <th>Fecha de consulta</th>
                                <th>Firma</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((dato) => (
                                <tr key={dato.num_consulta} >
                                    <td>{dato.num_consulta}</td>
                                    <td>{dato.nombre}</td>
                                    <td>{dato.cod_paciente}</td>
                                    <td>{dato.genero}</td>
                                    <td>{dato.telefono}</td>
                                    <td>{dato.motivo}</td>
                                    <td>{dato.fecha_consulta}</td>
                                    <td>{dato.encargado}</td>
                                    <td>
                                        <Button color="secondary" onClick={() => this.mostrarModalActualizar(dato)}><MdEdit /></Button>
                                        {" "}<Button color="danger" onClick={() => this.mostrarModalEliminar(dato)}><MdDelete /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
                <Modal isOpen={this.state.modalEliminar}>
                    <ModalHeader>
                        <div><h3>Eliminar registro</h3></div>
                        <ModalBody>
                            <p color="blue">¿Esta seguro que desea eliminar este registro?</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                onClick={() => this.eliminar()}
                            >
                                Eliminar
                            </Button>
                            <Button
                                color="danger"
                                onClick={() => this.cerrarModalEliminar()}
                            >
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </ModalHeader>
                </Modal>
                <Modal isOpen={this.state.modalActualizar}>
                    <FormEditar
                        encabezado = {"Editar Registro"}
                        handleChild={this.handleChild}
                        item={this.state.form}
                        cerrarModal={this.cerrarModalActualizar}
                        guardar={this.editar}
                    />

                </Modal>

                <Modal isOpen={this.state.modalInsertar}>
                    <FormEditar
                        item={{
                            num_consulta: "",
                            nombre: "",
                            cod_paciente: "",
                            genero: null,
                            telefono: "",
                            motivo: "",
                            fecha_consulta: "",
                            encargado: ""
                        }
                        }
                        encabezado = {"Agregar Consultas"}
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
