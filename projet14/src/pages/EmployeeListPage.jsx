// EmployeeListPage.jsx
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { getEmployees } from '../redux/employeeSlice';
import { Link } from 'react-router-dom';

const EmployeeListPage = ({ employeeList, getEmployees }) => {
  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
        canSort: true,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        canSort: true,
      },
      {
        Header: 'Date of Birth',
        accessor: 'dateOfBirth',
        Cell: ({ value }) => new Date(value).toLocaleDateString(), // Format the date
      },
      {
        Header: 'Start Date',
        accessor: 'startDate',
        Cell: ({ value }) => new Date(value).toLocaleDateString(), // Format the date
      },
      {
        Header: 'Street',
        accessor: 'street',
      },
      {
        Header: 'City',
        accessor: 'city',
      },
      {
        Header: 'State',
        accessor: 'state',
        canSort: true,
      },
      {
        Header: 'Zip Code',
        accessor: 'zipCode',
      },
      {
        Header: 'Department',
        accessor: 'department',
        canSort: true,
      },
    ],
    []
  );

  const data = React.useMemo(() => employeeList, [employeeList]);

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    gotoPage,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageOptions,
    setPageSize,
  } = useTable(
    { columns, data, initialState: { pageSize: 10 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <Paper>
      <div className="table-header">
        <h1>Current Employees</h1>
        <Input
          value={state.globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <Table {...getTableProps()} className="employee-table">
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="pagination">
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </Button>{' '}
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </Button>{' '}
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </Button>{' '}
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Button>{' '}
        <span>
          Page{' '}
          <strong>
            {state.pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={state.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
        <select
          value={state.pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          style={{ width: '100px' }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/">Home</Link>
      </div>
    </Paper>
    
  );
};

const mapStateToProps = (state) => ({
  employeeList: state.employees,
});

const mapDispatchToProps = { getEmployees };

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeListPage);
