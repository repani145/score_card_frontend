import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import AdminLayout from "./side_bar";
import DownloadPDF from "../customHooks/download_report";
import axios from "axios";
import { useAuth } from "../customHooks/user_auth";

const getBgColor = (value) => {
    if (value < 50) return "bg-danger text-white";
    if (value >= 50 && value < 75) return "bg-warning text-dark";
    return "bg-success text-white";
};

const ExportImport = ({ downloadData, sendEmail }) => {
    const { accessToken } = useAuth()
    const [category, setCategory] = useState("employees");
    const [count, setCount] = useState(10);
    const [email, setEmail] = useState("");
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [emailStatus, setEmailStatus] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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

    const handleGetData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/app/filtered-metrics/?category=${category}&count=${count}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (response.data.success) {
                setEmployees(response.data.data);
            } else {
                setErrorMessage(response.data.message || "Failed to retrieve data.");
            }
        } catch (error) {
            setErrorMessage("Error fetching data.");
        }
    };

    const handleDownloadPDF = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/app/download-filtered-pdf/?category=${category}&count=${count}`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    responseType: "blob", // Important for downloading files
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "filtered_data.pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading PDF:", error);
            setErrorMessage("Failed to download PDF.");
        }
    };

    const handleSendEmail = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/app/send-metrics-email/",
                {
                    email,
                    category,
                    count,
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            if (response.data.success) {
                setEmailStatus("Email sent successfully!");
            } else {
                setEmailStatus("Failed to send email.");
            }
        } catch (error) {
            setEmailStatus("Error sending email.");
        }
    };


    return (
        <AdminLayout>
            <div className="container mt-4 d-flex flex-column" style={{ height: "75vh", width: "95%" }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-3">
                        <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="employee">Employees</option>
                            <option value="project">Projects</option>
                            <option value="department">Departments</option>
                        </Form.Select>
                        <Form.Control
                            type="number"
                            min="1"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            placeholder="Enter count"
                        />
                        <Button variant="success" onClick={handleGetData}>
                            Get Data
                        </Button>
                    </div>

                </div>
                <div className="flex-grow-1 overflow-auto">
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
                            {employees.length > 0
                                ? employees.map((emp, index) => (
                                    <tr key={index}>
                                        <td>{emp.employee_name}</td>
                                        <td className={getBgColor(emp.productivity_score)}>
                                            {emp.productivity_score}%
                                        </td>
                                        <td className={getBgColor(emp.quality_score)}>
                                            {emp.quality_score}%
                                        </td>
                                        <td className={getBgColor(emp.timeliness_score)}>
                                            {emp.timeliness_score}%
                                        </td>
                                        <td>{emp.total_score}%</td>
                                    </tr>
                                ))
                                : Array.from({ length: 15 }).map((_, index) => (
                                    <tr key={index}>
                                        <td>Employee {index + 1}</td>
                                        <td className={getBgColor(60)}>{60}%</td>
                                        <td className={getBgColor(75)}>{75}%</td>
                                        <td className={getBgColor(80)}>{80}%</td>
                                        <td>72%</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </div>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Send Report via Email</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter recipient's email"
                            />
                        </Form.Group>
                        {emailStatus && <p className="mt-2">{emailStatus}</p>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSendEmail}>
                            Send Email
                        </Button>
                    </Modal.Footer>
                </Modal>;
                <div className="d-flex justify-content-end mt-3" style={{ position: "absolute", bottom: "-10px", right: "60px" }}>
                    <Button variant="info" onClick={() => setShowModal(true)} className="me-2">
                        Send to Email
                    </Button>
                    <Button variant="success" onClick={handleDownloadPDF}>
                        Download Data
                    </Button>
                </div>
            </div>
        </AdminLayout>
    );
};


export default ExportImport;
