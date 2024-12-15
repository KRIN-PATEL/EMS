import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TrashFill, PencilSquare, Info } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const EmployeeTable = ({ employees, setDeleteEmployeeId }) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const navigate = useNavigate();

  const handleDetailsClick = (id) => {
    navigate(`/employee/${id}`);
  };

  const EmployeeRow = ({ employee }) => (
    <tr
      onMouseEnter={() => setHoveredRow(employee.id)}
      onMouseLeave={() => setHoveredRow(null)}
      className={hoveredRow === employee.id ? "table-active" : ""}
    >
      <td>{employee.FirstName}</td>
      <td>{employee.LastName}</td>
      <td>{employee.Age}</td>
      <td>{new Date(employee.DateOfJoining).toLocaleDateString()}</td>
      <td>{employee.Title}</td>
      <td>{employee.Department}</td>
      <td>{employee.EmployeeType}</td>
      <td>{employee.CurrentStatus ? "Active" : "Inactive"}</td>
      <td>
        <Button
          variant="info"
          size="sm"
          onClick={() => handleDetailsClick(employee.id)}
        >
          <Info />
        </Button>
      </td>
      <td>
        <Button
          variant="danger"
          size="sm"
          onClick={() => setDeleteEmployeeId(employee.id)}
        >
          <TrashFill />
        </Button>
      </td>
      <td>
        <Button variant="success" size="sm">
          <Link
            to={`/employee/update/${employee.id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <PencilSquare />
          </Link>
        </Button>
      </td>
    </tr>
  );

  return (
    <div className="employee-table-container text-center" style={{ width: "100%" }}>
      <h3 className="mb-4">Employee List</h3>
      <Table
        striped
        bordered
        hover
        responsive
        className="employee-table"
        style={{
          width: "100%",
          margin: "0 auto",
        }}
      >
        <thead className="table-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Date Of Joining</th>
            <th>Title</th>
            <th>Department</th>
            <th>Employee Type</th>
            <th>Current Status</th>
            <th>Information</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <EmployeeRow key={employee.id} employee={employee} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeTable;
