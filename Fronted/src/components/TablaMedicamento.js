import {
  Table,
  Button,
  Container
} from "reactstrap";
import '../pages/Table.css'
import { MdEdit, MdDelete } from "react-icons/md";
import { useState } from "react";
import PaginationData from "./Pagination"
import Loading from "./Loading";
const App = (props) => {
  // hooks para el filtrado en la lista
  const [search, setSearch] = useState("");
  // Inicio de los elementos necesarios para la paginación
  const pageSize = 5
  const [currentPage, setCurrentPage] = useState(0)
  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index)
  }
  // Fin De los elementos necesarios para la paginación

  const onChange = (e) => {
    setSearch(e.target.value)
    setCurrentPage(0)
  }
  const filter = ()=>{
    return props.list
    .filter(item =>
      item.med_nombre.toLowerCase().includes(search) ||
      item.cod_med.toLowerCase().includes(search) ||
      item.med_nombre.includes(search) ||
      item.cod_med.includes(search) ||
      item.med_nombre.toUpperCase().includes(search) ||
      item.cod_med.toUpperCase().includes(search)
    )
  }
  
  const pagesCount = Math.ceil(filter().length / pageSize)
  return (
    <>
    <div className="content">
      <div className='main-components'>
        <div className='title-components'>

          <h1>Medicamentos</h1></div>

        <div className="search-div input-group rounded">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Buscar"
            aria-label="Search"
            aria-describedby="search-addon"
            name="search"
            value={search}
            onChange={onChange}
          />

        </div>
        <Button color="danger" onClick={() => props.mostrarAgregar()}>Agregar Medicamento</Button>
      </div>



      <Container fluid>
        <PaginationData
          currentPage={currentPage}
          handleClick={handleClick}
          pagesCount={pagesCount}
        />
        <Loading hidden = {props.hidden}/>
        {props.hidden &&
          <Table className='table table-borderless table-hover' style={{ width: '100%' }}>
            <thead className='table-light table-thead'>
              <tr>
                <th>ID</th>
                <th>Nombre medicamento</th>
                <th>Codigo de medicamento</th>
                <th>Cantidad de inventario</th>
                <th>Fecha de vencimiento</th>
                <th className='acciones-title'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filter()
                .slice(
                  currentPage * pageSize,
                  (currentPage + 1) * pageSize
                )
                .map((item) => (
                  <tr key={item.id_med} >
                    <td>{item.id_med}</td>
                    <td>{item.med_nombre}</td>
                    <td>{item.cod_med}</td>
                    <td>{item.stock}</td>
                    <td>{item.fecha_ven}</td>
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
      </div>
    </>
  );
}
export default App;