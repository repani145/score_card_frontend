import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import AdminLayout from "./side_bar";
import axios from "axios";
import { useAuth } from "../customHooks/user_auth";

const EmployeeTable = () => {
    const { accessToken } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const [employeeId, setEmployeeId] = useState("");
    const [employees, setEmployees] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const [newEmployee, setNewEmployee] = useState({
        employee_id: "",
        full_name: "",
        department: "",
        position: ""
    });

    const [employeeData, setEmployeeData] = useState({
        hrs_wrkd_per_week: "",
        tasks_completed: "",
        sales_made: "",
        error_rate: "",
        customer_rating: "",
        returns_or_complaints: "",
        deadlines_met: "",
        total_deadlines: "",
        project_cmple_times: "",
        target_cmple_times: ""
    });

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/app/employees_metric_view", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                if (response.data.success) {
                    setEmployees(response.data.data);
                } else {
                    setErrorMessage(response.data.message || "Failed to retrieve data.");
                }
            } catch (error) {
                setErrorMessage("Error fetching employee data.");
            }
        };

        dataFetch();
    }, []);

    const addEmployee = async (employee) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/app/add_employee", employee, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            return { success: 0, message: error.response?.data?.message || "Failed to add employee" };
        }
    };

    const addEmployeeData = async (data) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/app/add_employee_data", data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            return { success: 0, message: error.response?.data?.message || "Failed to add employee data" };
        }
    };

    const handleChange = (e) => {
        if (step === 1) {
            setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
        } else {
            setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
        }
    };

    const handleNext = async (e) => {
        e.preventDefault();
        setErrorMessage("");
    
        const response = await addEmployee(newEmployee);
        if (response.success) {
            setEmployeeId(response.employee_id);
            setStep(2);
        } else {
            setErrorMessage(response.message);
            setShowModal(true);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
    
        const response = await addEmployeeData({ ...employeeData, employee_id: employeeId });
    
        if (response.success) {
            setShowModal(false);
            setStep(1);
            setNewEmployee({
                employee_id: "",
                full_name: "",
                department: "",
                position: ""
            });
            setEmployeeData({
                hrs_wrkd_per_week: "",
                tasks_completed: "",
                sales_made: "",
                error_rate: "",
                customer_rating: "",
                returns_or_complaints: "",
                deadlines_met: "",
                total_deadlines: "",
                project_cmple_times: "",
                target_cmple_times: ""
            });
        } else {
            setErrorMessage(response.message);
            setShowModal(true);
        }
    };

    const getCellStyle = (value) => {
        if (value < 50) {
            return { backgroundColor: "red", color: "white" };
        } else if (value >= 50 && value <= 75) {
            return { backgroundColor: "orange", color: "black" };
        } else {
            return { backgroundColor: "green", color: "white" };
        }
    };

    return (
        <>
            <AdminLayout>
                <div className="container mt-4">
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" onClick={() => setShowModal(true)}>
                            Add Employee Data
                        </Button>
                    </div>
                    <Table striped bordered hover className="mt-3">
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Productivity</th>
                                <th>Quality</th>
                                <th>Timeliness</th>
                                <th>Total Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp, index) => (
                                <tr key={index}>
                                    <td>{emp.employee_name}</td>
                                    <td style={getCellStyle(emp.productivity_score)}>{emp.productivity_score}%</td>
                                    <td style={getCellStyle(emp.quality_score)}>{emp.quality_score}%</td>
                                    <td style={getCellStyle(emp.timeliness_score)}>{emp.timeliness_score}%</td>
                                    <td style={getCellStyle(emp.total_score)}>{emp.total_score}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{step === 1 ? "Add Employee" : "Add Employee Data"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                            <Form onSubmit={step === 1 ? handleNext : handleSubmit}>
                                <div className="row">
                                    {step === 1
                                        ? Object.keys(newEmployee).map((key, index) => (
                                            <div key={index} className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>{key.replace(/_/g, " ").toUpperCase()}</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name={key}
                                                        value={newEmployee[key]}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </Form.Group>
                                            </div>
                                        ))
                                        : Object.keys(employeeData).map((key, index) => (
                                            <div key={index} className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>{key.replace(/_/g, " ").toUpperCase()}</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name={key}
                                                        value={employeeData[key]}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </Form.Group>
                                            </div>
                                        ))}
                                </div>
                                <Button variant="primary" type="submit">
                                    {step === 1 ? "Next" : "Submit"}
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
            </AdminLayout>
        </>
    );
};

export default EmployeeTable;
