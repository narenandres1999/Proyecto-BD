import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter
} from "reactstrap";

import { MdEdit, MdDelete } from "react-icons/md";
import Select from 'react-select'
import { useState } from "react";

const FormEditar = (props) => {
    const [form, setForm] = useState(props.item)
    const [selected, setSelected] = useState({})
    const handleChange = (e) => {
        let target = e.target
        console.log(form)
        setForm({
            ...form,
            [target.name]: target.value
        })
        props.handleChild(form)
    }
    const options = [
        { value: 'Masculino', label: 'Masculino' },
        { value: 'Femenino', label: 'Femenino' }
    ]
    const changeGen = (genero) => {

        console.log(form)
        setForm({
            ...form,
            genero: genero.value
        })
    }
    const changeMedicamentos = (med) => {

        console.log(form)
        setSelected(med.value)
    }
    const addMed = () => {
        let newMedicamentos = form.medicamentos;
        let nuevoMedicamento = {};
        nuevoMedicamento = selected;
        nuevoMedicamento.cantidad = form.cantidad;
        newMedicamentos.push(nuevoMedicamento)
        setForm({
            ...form,
            medicamentos: newMedicamentos
        })
    }
    const eliminarMed = (med) => {
        let newMedicamentos = []
        form.medicamentos.map(item => {
            if (!(item.id_med === med.id_med && item.cantidad === med.cantidad)) {
                newMedicamentos.push(item)
            }
        })
        setForm({
            ...form,
            medicamentos: newMedicamentos
        })
    }

    return (
        <>
            <Modal isOpen={true}>
                <ModalHeader>
                    <div><h3>{props.encabezado}</h3></div>
                </ModalHeader>

                <ModalBody>
                    {(props.encabezado === "Editar Registro") &&
                        <FormGroup>

                            <label>
                                Id:
                            </label>

                            <input
                                className="form-control"
                                readOnly
                                type="text"
                                value={form.num_consulta}
                            />
                        </FormGroup>
                    }
                    <FormGroup>
                        <label>
                            Nombre:
                        </label>
                        <input
                            className="form-control"
                            name="nombre"
                            type="text"
                            onChange={handleChange}
                            value={form.nombre}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Codigo de estudiante:
                        </label>
                        <input
                            className="form-control"
                            name="cod_paciente"
                            type="text"
                            onChange={handleChange}
                            value={form.cod_paciente}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            genero:
                        </label>
                        <Select
                            options={options}
                            value={options.map(item => {
                                if (item.value === form.genero) {
                                    return { value: form.genero, label: item.label }
                                }
                            })}
                            onChange={changeGen}
                            className="form-control"
                            name="genero"
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
                            onChange={handleChange}
                            value={form.telefono}
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
                            onChange={handleChange}
                            value={form.motivo}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Fecha de consulta:
                        </label>
                        <input
                            className="form-control"
                            name="fecha_consulta"
                            type="text"
                            onChange={handleChange}
                            value={form.fecha_consulta}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Nombre Encargado:
                        </label>
                        <input
                            className="form-control"
                            name="encargado"
                            type="text"
                            onChange={handleChange}
                            value={form.encargado}
                        />
                    </FormGroup>
                </ModalBody>
                <Container>
                    <Select
                        options={props.optionsMed}
                        value={props.optionsMed.map(item => {
                            if (item.value.id_med === selected.id_med) {
                                return item
                            }
                        })}
                        onChange={changeMedicamentos}
                        className="form-control"
                        name="medicamentos"
                    />
                    <FormGroup>
                        <input
                            placeholder="Cantidad"
                            className="form-control"
                            name="cantidad"
                            type="text"
                            onChange={handleChange}
                            value={form.cantidad}
                        />
                    </FormGroup>
                    <Button color="secondary" onClick={() => { addMed() }}>Añadir</Button>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Codigo medicamento</th>
                                <th>Nombre medicamento</th>
                                <th>Cantidad</th>
                                <th>Fecha_Vencimiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {form.medicamentos.map((med) => (
                                <tr key = {med.id_med}>
                                    <td>{med.id_med}</td>
                                    <td>{med.cod_med}</td>
                                    <td>{med.med_nombre}</td>
                                    <td>{med.cantidad}</td>
                                    <td>{med.fecha_ven}</td>
                                    <td><Button color="danger" onClick={() => { eliminarMed(med) }}><MdDelete /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </Container>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => props.guardar(form)}
                    >
                        Guardar
                    </Button>
                    <Button
                        color="danger"
                        onClick={() => props.cerrarModal()}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>

        </>
    );
}

export default FormEditar;