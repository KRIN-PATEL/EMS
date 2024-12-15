import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Table, Container, Alert, Spinner } from "react-bootstrap";
import { GET_EMPLOYEE } from "../mutations/queries";

const EmployeeDetails = () => {
  const { employeeId } = useParams();

  const { error, loading, data } = useQuery(GET_EMPLOYEE, {
    variables: { id: employeeId },
  });

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Error loading employee details!</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading employee details...</p>
      </Container>
    );
  }

  const employee = data?.employee;

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4" style={{ color: "#153B5A" }}>
        Employee Details
      </h3>
      <Table
        striped
        bordered
        hover
        responsive
        className="employee-details-table"
        style={{ color: "#333" }}
      >
        <tbody>
          <tr>
            <th style={{ color: "#153B5A" }}>First Name</th>
            <td>{employee.FirstName}</td>
          </tr>
          <tr>
            <th style={{ color: "#153B5A" }}>Last Name</th>
            <td>{employee.LastName}</td>
          </tr>
          <tr>
            <th style={{ color: "#153B5A" }}>Age</th>
            <td>{employee.Age}</td>
          </tr>
          <tr>
            <th style={{ color: "#153B5A" }}>Date of Joining</th>
            <td>{new Date(employee.DateOfJoining).toLocaleDateString()}</td>
          </tr>
          <tr>
            <th style={{ color: "#153B5A" }}>Title</th>
            <td>{employee.Title}</td>
          </tr>
          <tr>
            <th style={{ color: "#153B5A" }}>Department</th>
            <td>{employee.Department}</td>
          </tr>
          <tr>
            <th style={{ color: "#153B5A" }}>Current Status</th>
            <td>{employee.CurrentStatus ? "Active" : "Inactive"}</td>
          </tr>
          <tr>
            <th style={{ color: "#153B5A" }}>Retirement Date</th>
            <td>{new Date(employee.RetirementDetails.RetirementDate).toLocaleDateString()}</td>
          </tr>
          <tr>
            <th style={{ color: "#153B5A" }}>Years Left</th>
            <td>{employee.RetirementDetails.Years}</td>
          </tr>
          <tr>
            <th style={{ color: "#153B5A" }}>Months Left</th>
            <td>{employee.RetirementDetails.Months}</td>
          </tr>
          <tr>
            <th style={{ color: "#153B5A" }}>Days Left</th>
            <td>{employee.RetirementDetails.Days}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default EmployeeDetails;
