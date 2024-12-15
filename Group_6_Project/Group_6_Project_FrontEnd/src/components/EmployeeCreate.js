import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_EMPLOYEE, GET_EMPLOYEES } from "../mutations/queries";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const EmployeeCreate = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
    DateOfJoining: "",
    Title: "",
    Department: "",
    EmployeeType: "",
    CurrentStatus: "true", 
  });
  const [errors, setErrors] = useState({});

  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    variables: {
      ...employee,
      Age: parseInt(employee.Age, 10),
      CurrentStatus: employee.CurrentStatus === "true", 
    },
    update: (cache, { data: { createEmployee } }) => {
      const existingEmployees = cache.readQuery({ query: GET_EMPLOYEES });
      if (existingEmployees) {
        cache.writeQuery({
          query: GET_EMPLOYEES,
          data: { employees: existingEmployees.employees.concat([createEmployee]) },
        });
      }
    },
    onCompleted: () => navigate("/employee-directory"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!employee.FirstName) newErrors.FirstName = "First Name is required";
    if (!employee.LastName) newErrors.LastName = "Last Name is required";
    if (!employee.Age) newErrors.Age = "Age is required";
    if (employee.Age < 20 || employee.Age > 70) newErrors.Age = "Must be 20-70";
    if (!employee.DateOfJoining) newErrors.DateOfJoining = "Date of Joining is required";
    if (!employee.Title) newErrors.Title = "Title is required";
    if (!employee.Department) newErrors.Department = "Department is required";
    if (!employee.EmployeeType) newErrors.EmployeeType = "Employee Type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      createEmployee();
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h3 className="text-center mb-4" style={{ color: "#143A5A" }}>
            Add New Employee
          </h3>
          <Form onSubmit={handleSubmit}>
            {Object.keys(errors).length > 0 && (
              <Alert variant="danger">
                {Object.values(errors).map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </Alert>
            )}
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#143A5A" }}>First Name</Form.Label>
              <Form.Control
                type="text"
                name="FirstName"
                value={employee.FirstName}
                onChange={handleChange}
                isInvalid={!!errors.FirstName}
              />
              <Form.Control.Feedback type="invalid">{errors.FirstName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#143A5A" }}>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="LastName"
                value={employee.LastName}
                onChange={handleChange}
                isInvalid={!!errors.LastName}
              />
              <Form.Control.Feedback type="invalid">{errors.LastName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#143A5A" }}>Age</Form.Label>
              <Form.Control
                type="number"
                name="Age"
                value={employee.Age}
                onChange={handleChange}
                isInvalid={!!errors.Age}
              />
              <Form.Control.Feedback type="invalid">{errors.Age}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#143A5A" }}>Date of Joining</Form.Label>
              <Form.Control
                type="date"
                name="DateOfJoining"
                value={employee.DateOfJoining}
                onChange={handleChange}
                isInvalid={!!errors.DateOfJoining}
              />
              <Form.Control.Feedback type="invalid">{errors.DateOfJoining}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#143A5A" }}>Title</Form.Label>
              <Form.Select
                name="Title"
                value={employee.Title}
                onChange={handleChange}
                isInvalid={!!errors.Title}
              >
                <option value="">Select Title</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.Title}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#143A5A" }}>Department</Form.Label>
              <Form.Select
                name="Department"
                value={employee.Department}
                onChange={handleChange}
                isInvalid={!!errors.Department}
              >
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.Department}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#143A5A" }}>Employee Type</Form.Label>
              <Form.Select
                name="EmployeeType"
                value={employee.EmployeeType}
                onChange={handleChange}
                isInvalid={!!errors.EmployeeType}
              >
                <option value="">Select Employee Type</option>
                <option value="FullTime">Full Time</option>
                <option value="PartTime">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Seasonal">Seasonal</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.EmployeeType}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#143A5A" }}>Current Status</Form.Label>
              <Form.Select
                name="CurrentStatus"
                value={employee.CurrentStatus}
                onChange={handleChange}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              style={{ backgroundColor: "#143A5A", borderColor: "#143A5A" }}
            >
              Create Employee
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeCreate;
