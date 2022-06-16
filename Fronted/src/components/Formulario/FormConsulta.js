import {
    Col,
    Row,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";

import Select from 'react-select'
import { useState } from "react";
import FormMedicamentos from "./components/addMedicamentos";
const FormConsulta = (props) => {
    const [form, setForm] = useState(props.item)
    const options = [
        { value: 'Masculino', label: 'Masculino' },
        { value: 'Femenino', label: 'Femenino' }
    ]
    const handleChange = (e) => {
        let target = e.target
        setForm({
            ...form,
            [target.name]: target.value
        })
        props.handleChild(form)
    }

    const changeGen = (genero) => {
        setForm({
            ...form,
            genero: genero.value
        })
    }
    const handleChild = (medicamentos) => {
        setForm({
            ...form,
            medicamentos: medicamentos
        })
    }
    return (
        <>
            <Modal isOpen={true} size="lg" style={{ maxWidth: '1280px', width: '95%', position: 'absolute', top: '45%', right: '50%', transform: 'translate(50%,-50%)' }}>
                <ModalHeader>
                    <div><h3>{props.encabezado}</h3></div>
                </ModalHeader>

                <ModalBody>
                    <Row className='content-row'>
                        <Col>
                    <Row className='row'>
                        <Col md={12} className='column'>
                            {(props.encabezado === "Editar Registro") &&
                            <div>
                                    <label>Id:</label>
                                    <input
                                        className="form-control"
                                        readOnly
                                        type="text"
                                        value={form.num_consulta}
                                    />
                            </div>
                            }

                            <label>Nombre:</label>
                            <input
                                required 
                                className="form-control"
                                name="nombre"
                                type="text"
                                onChange={handleChange}
                                value={form.nombre}
                            />

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

                            <label>
                                Genero:
                            </label>
                            <Select
                                options={options}
                                value={options.map(item => {
                                    if (item.value === form.genero) {
                                        return { value: form.genero, label: item.label }
                                    }
                                })}
                                onChange={changeGen}
                                className="select"
                                name="genero"
                            />

                            <label>
                                Telefono:
                            </label>
                            <input
                                className="form-control"
                                name="telefono"
                                type="text"
                                onChange={handleChange}
                                value={form.telefono}
                            />
                        </Col>
                    </Row>

                    <Row className='row row-md'>
                        <Col md={12} className='col'>
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
                        </Col>
                    </Row>

                    <Row className='row row-table'>
                        <Col md={16} className='col'>
                            <FormMedicamentos
                                optionsMed={props.optionsMed}
                                form={form}
                                handleChild={handleChild}
                            />
                        </Col>
                    </Row>
                    </Col>
                    </Row>


                </ModalBody>

                <ModalFooter>
                    <Button
                        color="secondary"
                        onClick={() => props.guardar(form)}>Guardar</Button>
                    <Button
                        color="danger"
                        onClick={() => props.cerrarModal()}>Cancelar</Button>
                </ModalFooter>
            </Modal>

        </>
    );
}

export default FormConsulta;