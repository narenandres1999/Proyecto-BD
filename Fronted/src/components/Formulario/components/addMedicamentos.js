import {
    Table,
    Button,
    Container,
} from "reactstrap";
import { useState } from "react";
import Select from 'react-select';
import { MdDelete } from "react-icons/md";

import '../../../pages/Table.css'

const FormMedicamentos = (props) => {
    const [cantidad, setCantidad] = useState(0);
    const [selected, setSelected] = useState({});
    const [medicamentos, setMedicamentos] = useState(props.form.medicamentos);
    const changeMedicamentos = (med) => {
        setSelected(med.value)
    }
    const handleChange = (e) => {
        let target = e.target;
        setCantidad(target.value)
    }
    const addMed = () => {
        const int = parseInt(cantidad);
        if (int > 0){
        let newMedicamentos = medicamentos;
        let nuevoMedicamento = {};
        nuevoMedicamento = selected;
        nuevoMedicamento.cantidad = cantidad;
        newMedicamentos.push(nuevoMedicamento);
        setMedicamentos(newMedicamentos);
        props.handleChild(medicamentos);
        }
    }
    const eliminarMed = (med) => {
        let newMedicamentos = [];
        medicamentos.map(item => {
            if (!(item.id_med === med.id_med && item.cantidad === med.cantidad)) {
                newMedicamentos.push(item);
            }
        })
        setMedicamentos(newMedicamentos);
        props.handleChild(newMedicamentos);
    }
    return (
        <>
            <Container fluid>
            
                <div className='medicamento'>
                <label>Medicamento:</label>
                    <br />
                    <div className='medicamento-select'>
                    <Select
                        options={props.optionsMed}
                        value={props.optionsMed.map(item => {
                            if (item.value.id_med === selected.id_med) {
                                return item
                            }
                        })}
                        onChange={changeMedicamentos}
                        className="select"
                        name="medicamentos"
                        placeholder='Seleccionar'
                    />
                    <input
                        placeholder="0"
                        className="form-control"
                        name="cantidad"
                        type="text"
                        onChange={handleChange}
                        value={cantidad}
                    />
                <Button color="secondary" onClick={() => { addMed() }}>Añadir</Button>

                    </div>

                </div>


                <Table className='table table-borderless table-hover'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Vencimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicamentos.map((med) => (
                            <tr key={med.id_med}>
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
        </>
    );
}
export default FormMedicamentos;