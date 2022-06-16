import {
    Pagination, PaginationItem, PaginationLink
  } from "reactstrap";
import '../pages/Table.css'
const PaginationData = (props) => {

    // Total de paginas dentro de la paginacion
    return (
        
        <div className="pagination-wrapper" >

            <Pagination aria-label="Page navigation example">
                <PaginationItem disabled={props.currentPage <= 0}>
                    <PaginationLink onClick={e => props.handleClick(e,0)}
                        first
                        href="#"
                    />
                </PaginationItem>


                <PaginationItem disabled={props.currentPage <= 0}>


                    <PaginationLink
                        onClick={e => props.handleClick(e, props.currentPage - 1)}
                        previous
                        href="#"
                    />

                </PaginationItem>

                {[...Array(props.pagesCount)].map((page, i) =>
                    <PaginationItem active={i === props.currentPage} key={i}>
                        <PaginationLink onClick={e => props.handleClick(e, i)} href="#" className={'paginationLinkStyle'}>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem disabled={props.currentPage >= props.pagesCount - 1}>

                    <PaginationLink
                        onClick={e => props.handleClick(e, props.currentPage + 1)}
                        next
                        href="#"
                    />

                </PaginationItem>


                <PaginationItem disabled={props.currentPage >= props.pagesCount - 1}>
                    <PaginationLink onClick={e => props.handleClick(e, props.pagesCount - 1)}
                        last
                        href="#"
                    />
                </PaginationItem>

            </Pagination>

        </div>
    )
}
export default PaginationData;