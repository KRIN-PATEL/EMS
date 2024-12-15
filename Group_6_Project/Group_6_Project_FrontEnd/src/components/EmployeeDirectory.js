import React, { useState, useEffect } from "react";
import { Container, Button, Form, Spinner, Alert } from "react-bootstrap";
import EmployeeTable from "./EmployeeTable";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeFilter from "./EmployeeFilter";
import EmployeeDelete from "./EmployeeDelete";
import { useMutation, useQuery } from "@apollo/client";
import {
  FILTER_EMPLOYEES,
  GET_EMPLOYEES,
  UPCOMING_RETIREMENTS,
} from "../mutations/queries";

const EmployeeDirectory = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [filterData, setFilterData] = useState({
    FirstName: "",
    Department: "",
  });
  const [deleteEmployeeId, setDeleteEmployeeId] = useState("");
  const [employeeTypeFilter, setEmployeeTypeFilter] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES);

  const {
    loading: loadingUpcoming,
    error: errorUpcoming,
    data: dataUpcoming,
    refetch: refetchUpcoming,
  } = useQuery(UPCOMING_RETIREMENTS, {
    variables: { EmployeeType: employeeTypeFilter },
    skip: activeTab !== "upcomingRetirements",
  });

  const [filterEmployees] = useMutation(FILTER_EMPLOYEES, {
    variables: filterData,
    update: (cache, { data: { filterEmployees } }) => {
      cache.writeQuery({
        query: GET_EMPLOYEES,
        data: { employees: filterEmployees },
      });
    },
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    if (tab === "upcomingRetirements") {
      refetchUpcoming();
    } else if (tab === "all") {
      refetch();
    }
  };

  const handleSearchChange = (text) => {
    setFilterData((prev) => ({ ...prev, FirstName: text }));
  };

  const handleFilterChange = (department) => {
    setFilterData((prev) => ({ ...prev, Department: department }));
  };

  const handleSearchSubmit = () => {
    filterEmployees();
  };

  const handleEmployeeTypeChange = (type) => {
    setEmployeeTypeFilter(type);
    refetchUpcoming({ EmployeeType: type });
  };

  useEffect(() => {
    if (
      !filterData.FirstName &&
      !filterData.Department &&
      activeTab === "all"
    ) {
      refetch();
    }
  }, [filterData, refetch, activeTab]);

  if (activeTab === "all" && loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </Container>
    );
  }
  if (activeTab === "all" && error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Error loading data. Please try again.</Alert>
      </Container>
    );
  }

  if (activeTab === "upcomingRetirements" && loadingUpcoming) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading upcoming retirements...</p>
      </Container>
    );
  }

  if (activeTab === "upcomingRetirements" && errorUpcoming) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          Error loading upcoming retirements. Please try again.
        </Alert>
      </Container>
    );
  }

  return (
    <Container
      className="employee-directory-container mt-4"
      style={{
        width: "90%",
        backgroundColor: "#F8F9FA",
        padding: "20px",
        borderRadius: "8px",
        border: `2px solid #153B5A`,
        margin: "0 auto",
        overflowX: "auto", 
      }}
    >
      <div className="tabs text-center mb-4">
        <Button
          variant={activeTab === "all" ? "primary" : "outline-primary"}
          className="me-2"
          onClick={() => handleTabChange("all")}
          style={{ backgroundColor: "#153B5A", borderColor: "#153B5A" }}
        >
          All Employees
        </Button>
        <Button
          variant={activeTab === "upcomingRetirements" ? "primary" : "outline-primary"}
          onClick={() => handleTabChange("upcomingRetirements")}
          style={{ backgroundColor: "#153B5A", borderColor: "#153B5A" }}
        >
          Upcoming Retirements
        </Button>
      </div>

      {activeTab === "all" && (
        <div className="employee-search-filter-container">
          <div className="mb-4">
            <EmployeeSearch
              handleSearchChange={handleSearchChange}
              handleSearchSubmit={handleSearchSubmit}
            />
          </div>
          <div className="mb-4">
            <EmployeeFilter
              handleFilterChange={handleFilterChange}
              currentDepartment={filterData.Department}
            />
          </div>
        </div>
      )}
      {activeTab === "all" &&
        !loading &&
        !error &&
        data.employees.length !== 0 && (
          <>
            <EmployeeTable
              employees={data.employees}
              setDeleteEmployeeId={setDeleteEmployeeId}
            />
            {deleteEmployeeId && (
              <EmployeeDelete
                deleteEmployeeId={deleteEmployeeId}
                setDeleteEmployeeId={setDeleteEmployeeId}
              />
            )}
          </>
        )}
      {activeTab === "all" && !loading && data.employees.length === 0 && (
        <p style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
          No employees found!
        </p>
      )}
      {activeTab === "upcomingRetirements" && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Filter by Employee Type:</Form.Label>
            <Form.Select
              onChange={(e) => handleEmployeeTypeChange(e.target.value)}
              value={employeeTypeFilter}
            >
              <option value="">All</option>
              <option value="FullTime">FullTime</option>
              <option value="PartTime">PartTime</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </Form.Select>
          </Form.Group>
          {dataUpcoming && dataUpcoming.upcomingRetirements.length > 0 && (
            <EmployeeTable
              employees={dataUpcoming.upcomingRetirements}
              setDeleteEmployeeId={setDeleteEmployeeId}
            />
          )}
          {dataUpcoming && dataUpcoming.upcomingRetirements.length === 0 && (
            <p style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
              No employees found for the selected Employee Type!
            </p>
          )}
        </>
      )}
    </Container>
  );
};

export default EmployeeDirectory;
