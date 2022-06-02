import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegistroConsultas.css'

import { MdEdit, MdDelete } from "react-icons/md";
import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";

const data = [
    { id: 1, nombre: 'Juan Riascos', codigoEstudiante: '2058726', genero: 'Helicoptero Apache de combate', telefono: '000000000', motivo: 'Arrechera', medicamento: "pipisilina", fechaConsulta: '28-5-2022', firma: 'Erika' },
    { id: 2, nombre: 'Andres Alarcon', codigoEstudiante: '2058657', genero: 'Masculino', telefono: '3007523347', motivo: 'Mucha lloradera', medicamento: "pipisilina", fechaConsulta: '28-5-2022', firma: 'Erika' },
    { id: 3, nombre: 'Naren Medina', codigoEstudiante: '2059393', genero: 'Masculino', telefono: '000000000', motivo: 'Le dolia el pipi', medicamento: "pipisilina", fechaConsulta: '28-5-2022', firma: 'Erika' },
    { id: 4, nombre: 'Alejandro Arenas', codigoEstudiante: '2059172', genero: 'Culion', telefono: '000000000', motivo: 'Picho 20 veces', medicamento: "pipisilina", fechaConsulta: '28-5-2022', firma: 'Erika' }
];

class App extends React.Component {
    state = {
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
            id: "",
            nombre: "",
            codigoEstudiante: "",
            genero: "",
            telefono: "",
            motivo: "",
            medicamento: "",
            fechaConsulta: "",
            firma: ""
        },
    };

    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
        });
    };

    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };

    mostrarModalInsertar = () => {
        this.setState({
            modalInsertar: true,
        });
    };

    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };

    editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
            if (dato.id == registro.id) {
                arreglo[contador].id = dato.id;
                arreglo[contador].nombre = dato.nombre;
                arreglo[contador].codigoEstudiante = dato.codigoEstudiante;
                arreglo[contador].genero = dato.genero;
                arreglo[contador].telefono = dato.telefono;
                arreglo[contador].motivo = dato.motivo;
                arreglo[contador].medicamento = dato.medicamento;
                arreglo[contador].fechaConsulta = dato.fechaConsulta;
                arreglo[contador].firma = dato.firma;
            }
            contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
    };

    eliminar = (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
        if (opcion == true) {
            var contador = 0;
            var arreglo = this.state.data;
            arreglo.map((registro) => {
                if (dato.id == registro.id) {
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ data: arreglo, modalActualizar: false });
        }
    };

    insertar = () => {
        var valorNuevo = { ...this.state.form };
        valorNuevo.id = this.state.data.length + 1;
        var lista = this.state.data;
        lista.push(valorNuevo);
        this.setState({ modalInsertar: false, data: lista });
    }

    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    render() {
        return (
            <>
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
                                <th>Medicamento</th>
                                <th>Fecha de consulta</th>
                                <th>Firma</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.data.map((dato) => (
                                <tr key={dato.id}>
                                    <td>{dato.id}</td>
                                    <td>{dato.nombre}</td>
                                    <td>{dato.codigoEstudiante}</td>
                                    <td>{dato.genero}</td>
                                    <td>{dato.telefono}</td>
                                    <td>{dato.motivo}</td>
                                    <td>{dato.medicamento}</td>
                                    <td>{dato.fechaConsulta}</td>
                                    <td>{dato.firma}</td>
                                    <td>
                                        <Button color="primary" onClick={() => this.mostrarModalActualizar(dato)}><MdEdit />
                                        </Button>{" "}<Button color="danger" onClick={() => this.eliminar(dato)}><MdDelete /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <br />
                    <Button color="success" onClick={() => this.mostrarModalInsertar()}>Crear</Button>
                    <br />
                    <br />
                </Container>

                <Modal isOpen={this.state.modalActualizar}>
                    <ModalHeader>
                        <div><h3>Editar Registro</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>
                                Id:
                            </label>

                            <input
                                className="form-control"
                                readOnly
                                type="text"
                                value={this.state.form.id}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Nombre:
                            </label>
                            <input
                                className="form-control"
                                name="nombre"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.nombre}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Codigo de estudiante:
                            </label>
                            <input
                                className="form-control"
                                name="codigoEstudiante"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.codigoEstudiante}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                genero:
                            </label>
                            <input
                                className="form-control"
                                name="genero"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.genero}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                telefono:
                            </label>
                            <input
                                className="form-control"
                                name="telefono"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.telefono}
                            />
                        </FormGroup>


                        <FormGroup>
                            <label>
                                Nombre de encargado:
                            </label>
                            <input
                                className="form-control"
                                name="nombreEncargado"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.nombreEncargado}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Motivo de Consulta:
                            </label>
                            <input
                                className="form-control"
                                name="motivo"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.motivo}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Fecha de consulta:
                            </label>
                            <input
                                className="form-control"
                                name="fechaConsulta"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.fechaConsulta}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Firma:
                            </label>
                            <input
                                className="form-control"
                                name="firma"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.firma}
                            />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => this.editar(this.state.form)}
                        >
                            Editar
                        </Button>
                        <Button
                            color="danger"
                            onClick={() => this.cerrarModalActualizar()}
                        >
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div><h3>Insertar Personaje</h3></div>
                    </ModalHeader>


                    <ModalBody>
                        <FormGroup>
                            <label>
                                Id:
                            </label>

                            <input
                                className="form-control"
                                readOnly
                                type="text"
                                value={this.state.form.id}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Nombre:
                            </label>
                            <input
                                className="form-control"
                                name="nombre"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.nombre}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Codigo de estudiante:
                            </label>
                            <input
                                className="form-control"
                                name="codigoEstudiante"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.codigoEstudiante}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                genero:
                            </label>
                            <input
                                className="form-control"
                                name="genero"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.genero}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                telefono:
                            </label>
                            <input
                                className="form-control"
                                name="telefono"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.telefono}
                            />
                        </FormGroup>


                        <FormGroup>
                            <label>
                                Nombre de encargado:
                            </label>
                            <input
                                className="form-control"
                                name="nombreEncargado"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.nombreEncargado}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Motivo de Consulta:
                            </label>
                            <input
                                className="form-control"
                                name="motivo"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.motivo}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Fecha de consulta:
                            </label>
                            <input
                                className="form-control"
                                name="fechaConsulta"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.fechaConsulta}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Firma:
                            </label>
                            <input
                                className="form-control"
                                name="firma"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.firma}
                            />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => this.insertar()}
                        >
                            Insertar
                        </Button>
                        <Button
                            className="btn btn-danger"
                            onClick={() => this.cerrarModalInsertar()}
                        >
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}
export default App;
