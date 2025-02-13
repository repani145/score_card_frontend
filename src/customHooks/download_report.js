import React from "react";

const DownloadPDF = () => {
  const handleDownload = () => {
    fetch("http://127.0.0.1:8000/download-pdf/", {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    })
      .then((response) => response.blob()) // Convert response to a blob
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "table-data.pdf"; // Set download filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => console.error("Error downloading PDF:", error));
  };

  return <button onClick={handleDownload}>Download PDF</button>;
};

export default DownloadPDF;
