// EmployeeListPage.jsx
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTable } from 'react-table';
import { getEmployees } from './employeeSlice';

const EmployeeListPage = ({ employeeList, getEmployees }) => {
  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Date of Birth',
        accessor: 'dateOfBirth',
      },
    ],
    []
  );

  const data = React.useMemo(() => employeeList, [employeeList]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div>
      <h1>Employee List</h1>
      <table {...getTableProps()} className="employee-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  employeeList: state.employees,
});

const mapDispatchToProps = { getEmployees };

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeListPage);
