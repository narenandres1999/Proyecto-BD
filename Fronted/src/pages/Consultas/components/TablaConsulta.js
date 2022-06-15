import {
    Table,
    Button,
    Container,
} from "reactstrap";
import '../../Table.css'
import { MdEdit, MdDelete } from "react-icons/md";
const TablaConsulta = (props) => {
    return (
        <>
            <h3>Gestor de consultas</h3>
            <Button color="danger" onClick={() => props.mostrarAgregar()}>Agregar consultas</Button>
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
                        {props.list.map((item) => (
                            <tr key={item.num_consulta} >
                                <td>{item.num_consulta}</td>
                                <td>{item.nombre}</td>
                                <td>{item.cod_paciente}</td>
                                <td>{item.genero}</td>
                                <td>{item.telefono}</td>
                                <td>{item.motivo}</td>
                                <td>{item.fecha_consulta}</td>
                                <td>{item.encargado}</td>
                                <td>
                                    <Button color="secondary" onClick={() => props.mostrarEditar(item)}><MdEdit /></Button>
                                    {" "}<Button color="danger" onClick={() => props.mostrarEliminar(item)}><MdDelete /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}
export default TablaConsulta;