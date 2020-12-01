import React from 'react'
import BootstrapTable from 'react-bootstrap/Table'
import styled from 'styled-components'

const StyledTable = styled.div`
height: 80vh;
overflow-x: auto;
padding: 3rem;
padding-top: 0;
.table {
  font-size: calc(10px + 0.8vmin);
  position: relative;

}
  .table thead th  {
    background-color: #fff;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-bottom: 0;
    font-weight: 400;
    border-top: none;
    color:#212121;
    position: sticky;
    top: 0;
    border-bottom: none;
    box-shadow: inset 0 -1px 0 #dee2e6;
  }
  .table td {
    padding-top: 2em;
    padding-left: 3em;
    padding-right: 3em;
    vertical-align: bottom;
  }
  .table tbody tr {
    color: #212121;
    font-weight:500;
    .availability , .name , .manufacturer {
      font-weight: 800;
    }
  }
`

const Table:React.FC= (props) => {
    return (
        <StyledTable className='infiniteScrollRoot'>
            <BootstrapTable>
                {props.children}
            </BootstrapTable>
        </StyledTable>
    )
}

export default Table