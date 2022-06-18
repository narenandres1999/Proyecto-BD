import {
    Col,
    Row,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import { useState } from "react";
const App = (props) => {
    const [form, setForm] = useState(props.item)
    // Función que controla los cambios en los imputs
    const handleChange = (e) => {
        let target = e.target
        setForm({
            ...form,
            [target.name]: target.value
        })
        props.handleChild(form)
    }
    return (
        <>
            <Modal isOpen={true} size="lg" style={{ maxWidth: '540px', width: '95%', position: 'absolute', top: '45%', right: '50%', transform: 'translate(50%,-50%)' }}>
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
                                                value={form.id_med}
                                            />
                                        </div>
                                    }

                                    <label>Nombre Medicamento:</label>
                                    <input
                                        required
                                        className="form-control"
                                        name="med_nombre"
                                        type="text"
                                        onChange={handleChange}
                                        value={form.med_nombre}
                                    />

                                    <label>
                                        Codigo de medicamento:
                                    </label>
                                    <input
                                        className="form-control"
                                        name="cod_med"
                                        type="text"
                                        onChange={handleChange}
                                        value={form.cod_med}
                                    />
                                </Col>
                            </Row>

                            <Row className='row row-md'>
                                <Col md={12} className='col'>
                                    <label>
                                        Cantidad de inventario:
                                    </label>
                                    <input
                                        className="form-control"
                                        name="stock"
                                        type="text"
                                        onChange={handleChange}
                                        value={form.stock}
                                    />
                                    <label>
                                        Fecha de vencimiento:
                                    </label>
                                    <input
                                        className="form-control"
                                        name="fecha_ven"
                                        type="text"
                                        onChange={handleChange}
                                        value={form.fecha_ven}
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

export default App;