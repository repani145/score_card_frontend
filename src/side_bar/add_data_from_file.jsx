import { useState } from "react";
import { Button } from "react-bootstrap";
import AdminLayout from "./side_bar";


const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:8000//app/upload_employees_metrics", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("File uploaded successfully!");
            } else {
                alert("File upload failed.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("An error occurred while uploading.");
        }
    };

    return (
        <>
            <AdminLayout>
                <div className="relative h-screen flex items-center justify-center">
                    {/* Download Button at the Top Right */}
                    <div className="absolute top-4 right-4">
                        <a href="/employee_metrics_sample_sheet.xlsx" download>
                            <Button>Download Sample File</Button>
                        </a>
                    </div>

                    {/* File Upload Section */}
                    <div className="p-4 border rounded-lg shadow-md w-80 flex flex-col items-center">
                        <input type="file" onChange={handleFileChange} className="mb-4" />
                        <Button onClick={handleUpload} className="w-full">Add Employees Data</Button>
                    </div>
                </div>

            </AdminLayout>
        </>
    );
};

export default FileUpload;
