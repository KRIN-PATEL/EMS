import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const EmployeeFilter = ({ handleFilterChange, currentDepartment }) => {
    const [selected, setSelected] = useState(currentDepartment);

    const departments = ["IT", "Marketing", "HR", "Engineering"];

    const handleOnSelect = (department) => {
        setSelected(department); 
        handleFilterChange(department); 
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {selected === "" ? "Select Department" : selected}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleOnSelect("")}>All Departments</Dropdown.Item>
                {departments.map(dept => (
                    <Dropdown.Item key={dept} onClick={() => handleOnSelect(dept)}>
                        {dept}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default EmployeeFilter;
