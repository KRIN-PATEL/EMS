import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Search as SearchIcon } from "react-bootstrap-icons";

const EmployeeSearch = ({ handleSearchChange, handleSearchSubmit }) => {
    const [text, setText] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleSearchChange(text);
        handleSearchSubmit(); 
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex gap-1">
            <input
                type="text"
                placeholder="Enter First Name"
                className="form-control"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button variant="secondary" type="submit">
                <SearchIcon />
            </Button>
        </form>
    );
};

export default EmployeeSearch;
