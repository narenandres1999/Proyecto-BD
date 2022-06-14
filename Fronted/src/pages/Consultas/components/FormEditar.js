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
import Select from 'react-select'
import { useState } from "react";

/*const [form,setForm] = useState({
    num_consulta: "",
    nombre: "",
    cod_paciente: "",
    genero: null,
    telefono: "",
    motivo: "",
    fecha_consulta: "",
    encargado: ""
})*/
const FormEditar = (props) => {
    const [form,setForm] = useState(props.item)
    const handleChange = (e)=>{
        let target = e.target
        
        setForm({
            ...form,
            [target.name]:target.value
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
    return (
        <>
        <Modal isOpen = {true}>
            <ModalHeader>
                <div><h3>{props.encabezado}</h3></div>
            </ModalHeader>

            <ModalBody>
                { (props.encabezado === "Editar Registro") &&
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
                    <tr key={med.id_med} >
                        <td>{med.id_med}</td>
                        <td>{med.cod_med}</td>
                        <td>{med.med_nombre}</td>
                        <td>{med.cantidad}</td>
                        <td>{med.fecha_ven}</td>
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