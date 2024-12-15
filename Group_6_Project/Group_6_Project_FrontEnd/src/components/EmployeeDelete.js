import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_EMPLOYEE, GET_EMPLOYEES } from "../mutations/queries";

const EmployeeDelete = ({ deleteEmployeeId, setDeleteEmployeeId }) => {
    
    const [errorMessage, setErrorMessage] = useState("");

    
    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
        variables: { id: deleteEmployeeId }, 
        onError: (error) => {
            setErrorMessage(error.message);
        },
        update: (cache, { data: { deleteEmployee } }) => {
            const { employees } = cache.readQuery({
                query: GET_EMPLOYEES, 
            });
            cache.writeQuery({
                query: GET_EMPLOYEES,
                data: {
                    employees: employees.filter(
                        (employee) => employee.id !== deleteEmployee.id 
                    ),
                },
            });
        },
        onCompleted: () => {
            setErrorMessage("");
            setDeleteEmployeeId(""); 
        },
    });

    const handleYesClick = () => {
        deleteEmployee(); 
    };

    const handleNoClick = () => {
        setDeleteEmployeeId(""); 
        setErrorMessage("");
    };

    return (
        <div className="delete-wrap">
            <div className="inner-wrap">
                <h4 className="delete-title">Are you sure you want to delete this employee?</h4>
                
                {errorMessage && (
                    <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
                )}
                
                <div className="btn-wrap">
                    <button className="btn-yes" onClick={handleYesClick}>
                        Yes
                    </button>
                    <button className="btn-no" onClick={handleNoClick}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDelete;
