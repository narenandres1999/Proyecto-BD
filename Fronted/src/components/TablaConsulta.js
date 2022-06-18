import {
  Table,
  Button,
  Container
} from "reactstrap";
import '../pages/Table.css'
import { MdEdit, MdDelete } from "react-icons/md";
import { useState } from "react";
import PaginationData from "./Pagination";
import Loading from "./Loading";
const App = (props) => {
  // hooks para el filtrado en la lista
  const [search, setSearch] = useState("");
  // Inicio de los elementos necesarios para la paginación
  const pageSize = 5
  const [currentPage, setCurrentPage] = useState(0)
  const pagesCount = Math.ceil(props.list.length / pageSize)
  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index)
  }
  // Fin De los elementos necesarios para la paginación

  const filter = (e) => {
    setSearch(e.target.value)
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
            name="search"
            value={search}
            onChange={filter}
          />

        </div>
        <Button color="danger" onClick={() => props.mostrarAgregar()}>Agregar consultas</Button>
      </div>



      <Container fluid>
        <PaginationData
          currentPage={currentPage}
          handleClick={handleClick}
          pagesCount={pagesCount}
        />
        
        <Loading hidden = {props.hidden}/>
        { props.hidden &&
        <Table className='table table-borderless table-hover' style={{ width: '100%' }}>
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
          <tbody style={{ overflow: 'auto' }}>
            {props.list
              .filter(item =>
                item.nombre.includes(search) ||
                item.genero.includes(search) ||
                item.encargado.includes(search) ||
                // ToLowerCase
                item.nombre.toLowerCase().includes(search) ||
                item.genero.toLowerCase().includes(search) ||
                item.cod_paciente.toString().includes(search) ||
                item.fecha_consulta.includes(search) ||
                item.encargado.toLowerCase().includes(search)
              )
              .slice(
                currentPage * pageSize,
                (currentPage + 1) * pageSize
              )
              .map((item) => (
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
        }
      </Container>
    </>
  );
}
export default App;