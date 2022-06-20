import {
    Table,
    Button,
    Container,
} from "reactstrap";
import { useState } from "react";
import Select from 'react-select';
import { MdDelete } from "react-icons/md";
import '../../../pages/Table.css'

const App = (props) => {
    const [cantidad, setCantidad] = useState(0);
    const [selected, setSelected] = useState({});
    const [medicamentos, setMedicamentos] = useState(props.form.medicamentos);
    
    // Función que controla los cambios en la selccion de medicamentos
    const changeMedicamentos = (med) => {
        setSelected(med.value)
    }
    // Función que controla los cambios en el imput de cantidad
    const handleChange = (e) => {
        let target = e.target;
        setCantidad(target.value)
    }
    // Función para el botón añadir un medicamento nuevo
    const addMed = () => {
        try {
            let int = parseInt(cantidad);
            var error = {};
            if (isNaN(int)) {
                error ={
                    message: "La cantidad debe ser un valor numérico entero",
                    status: "300",
                    type: "error"
                }
                throw error;
            }
            for (let i in medicamentos) {
                if (medicamentos[i].id_med === selected.id_med) {
                    error = {
                        message: "El medicamento ya está añadido",
                        status: "300",
                        type: "error"
                    }
                    throw error;
                }
            }
            if (selected.id_med === undefined) {
                error = {
                    message: "Seleccione un medicamento",
                    status: "300",
                    type: "error"
                }
                throw error;
            }
            if (int <= 0) {
                error = {
                    message: "La cantidad del medicamento seleccionado debe ser mayor a 0",
                    status: "300",
                    type: "error"
                }
                throw error
            }
            if (selected.stock - cantidad < 0) {
                error = {
                    message: "No hay suficiente medicamento por favor revisar el inventario de medicamentos",
                    status: "300",
                    type: "error"
                }
                throw error
            }
            let newMedicamentos = medicamentos;
            let nuevoMedicamento = {};
            nuevoMedicamento = selected;
            nuevoMedicamento.cantidad = int;
            newMedicamentos.push(nuevoMedicamento);
            setMedicamentos(newMedicamentos);
            props.obtenerMedicamentos(medicamentos);
        } catch (err) {
            console.log(err)
            props.obtenerMensaje(err)
        }
    }
    // Función para la eliminación de alguna selección de medicamento
    const eliminarMed = (med) => {
        let newMedicamentos = [];
        medicamentos.map(item => {
            if (!(item.id_med === med.id_med && item.cantidad === med.cantidad)) {
                newMedicamentos.push(item);
            }
            return null;
        })
        setMedicamentos(newMedicamentos);
        props.obtenerMedicamentos(newMedicamentos);
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
                                return null;
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
export default App;