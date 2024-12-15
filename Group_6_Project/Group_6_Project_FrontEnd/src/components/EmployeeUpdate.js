import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { GET_EMPLOYEE, UPDATE_EMPLOYEE } from "../mutations/queries";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const EmployeeUpdate = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [employeeDetails, setEmployeeDetails] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
    DateOfJoining: "",
    Title: "",
    Department: "",
    EmployeeType: "",
    CurrentStatus: "",
  });
  const [errors, setErrors] = useState({});

  const { loading, error, data } = useQuery(GET_EMPLOYEE, {
    variables: { id: employeeId },
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    variables: {
      id: employeeId,
      ...employeeDetails,
      Age: parseInt(employeeDetails.Age, 10),
      CurrentStatus: employeeDetails.CurrentStatus === "true",
    },
    onCompleted: () => navigate("/employee-directory"),
  });

  useEffect(() => {
    if (data && data.employee) {
      setEmployeeDetails({
        FirstName: data.employee.FirstName,
        LastName: data.employee.LastName,
        Age: data.employee.Age,
        DateOfJoining: data.employee.DateOfJoining.split("T")[0],
        Title: data.employee.Title,
        Department: data.employee.Department,
        EmployeeType: data.employee.EmployeeType,
        CurrentStatus: data.employee.CurrentStatus ? "true" : "false",
      });
    }
  }, [data]);

  const validateInputs = () => {
    const newErrors = {};
    if (!employeeDetails.FirstName) newErrors.FirstName = "First Name is required";
    if (!employeeDetails.LastName) newErrors.LastName = "Last Name is required";
    if (!employeeDetails.Age) newErrors.Age = "Age is required";
    if (employeeDetails.Age < 20 || employeeDetails.Age > 70)
      newErrors.Age = "Age must be between 20 and 70";
    if (!employeeDetails.DateOfJoining) newErrors.DateOfJoining = "Date of Joining is required";
    if (!employeeDetails.Title) newErrors.Title = "Title is required";
    if (!employeeDetails.Department) newErrors.Department = "Department is required";
    if (!employeeDetails.EmployeeType) newErrors.EmployeeType = "Employee Type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      updateEmployee();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading employee details!</p>;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h3 className="text-center mb-4" style={{ color: "#143A5A" }}>
            Update Employee
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
                value={employeeDetails.FirstName}
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
                value={employeeDetails.LastName}
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
                value={employeeDetails.Age}
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
                value={employeeDetails.DateOfJoining}
                onChange={handleChange}
                isInvalid={!!errors.DateOfJoining}
              />
              <Form.Control.Feedback type="invalid">{errors.DateOfJoining}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#143A5A" }}>Title</Form.Label>
              <Form.Select
                name="Title"
                value={employeeDetails.Title}
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
                value={employeeDetails.Department}
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
                value={employeeDetails.EmployeeType}
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
              <Form.Label style={{ color: "#143A5A" }}>Status</Form.Label>
              <Form.Select
                name="CurrentStatus"
                value={employeeDetails.CurrentStatus}
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
              Update Employee
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeUpdate;
