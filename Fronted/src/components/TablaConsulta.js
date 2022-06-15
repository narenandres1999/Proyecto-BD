import {
    Table,
    Button,
    Container,
    Pagination, PaginationItem, PaginationLink
} from "reactstrap";
import '../pages/Table.css'
import { MdEdit, MdDelete } from "react-icons/md";
import { useState } from "react";
const TablaConsulta = (props) => {
    const [listFilter,setListFilter] = useState(props.list);
    const [search,setSearch] = useState("");
    const filter = (e)=>{

    }

    return (
        <>                
        
        <div className='main-components'>
            <div className='title-components'>

                <h1>Consultas medicas</h1></div>

                <div class="search-div input-group rounded">
                <input 
                type="search" 
                class="form-control rounded" 
                placeholder="Buscar" 
                aria-label="Search" 
                aria-describedby="search-addon"
                name = "buscar"
                value = {search} 
                onChange = {filter}
                />

            </div>                
                <Button color="danger" onClick={() => props.mostrarAgregar()}>Agregar consultas</Button>                
        </div>



            <Container fluid>
                <Table className='table table-borderless table-hover' style={{width: '100%'}}>
                    <thead className='table-light table-thead'>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Codigo de estudiante</th>
                            <th>Genero</th>
                            <th>Telefono</th>
                            <th>Motivo</th>
                            <th>Fecha de consulta</th>
                            <th>Firma</th>
                            <th className='acciones-title'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody style={{overflow:'auto'}} className='bod'>
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
                                <td className='acciones'>
                                    <Button color="secondary" onClick={() => props.mostrarEditar(item)}><MdEdit /></Button>
                                    <Button color="danger" onClick={() => props.mostrarEliminar(item)}><MdDelete /></Button>
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