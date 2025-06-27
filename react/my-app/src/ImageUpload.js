import React, { useState } from "react";
import axios from "axios";
import { labelInfo } from "./LabelInfo";
function ImageUpload() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileChange = e => {
        setFile(e.target.files[0]);
        setResult(null);
    };

    const handleUpload = async () => {
        if (!file) return alert("Choose a file first");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", "1");
        try {
            const res = await axios.post(
                "http://localhost:8000/api/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setResult(res.data);
        } catch (err) {
            console.error(err.response?.data || err);
            alert("Upload failed");
        }
    };

    return (
        <div>
            <h2 style={{ color: "red", margin: "20px" }}>Upload Image</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <div className="d-grid">
                <button
                    type="button"
                    style={{ margin: "20px" }}
                    className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={handleUpload}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-lungs-fill" viewBox="0 0 16 16">
                        <path d="M8 1a.5.5 0 0 1 .5.5v5.243L9 7.1V4.72C9 3.77 9.77 3 10.72 3c.524 0 1.023.27 1.443.592.431.332.847.773 1.216 1.229.736.908 1.347 1.946 1.58 2.48.176.405.393 1.16.556 2.011.165.857.283 1.857.24 2.759-.04.867-.232 1.79-.837 2.33-.67.6-1.622.556-2.741-.004l-1.795-.897A2.5 2.5 0 0 1 9 11.264V8.329l-1-.715-1 .715V7.214c-.1 0-.202.03-.29.093l-2.5 1.786a.5.5 0 1 0 .58.814L7 8.329v2.935A2.5 2.5 0 0 1 5.618 13.5l-1.795.897c-1.12.56-2.07.603-2.741.004-.605-.54-.798-1.463-.838-2.33-.042-.902.076-1.902.24-2.759.164-.852.38-1.606.558-2.012.232-.533.843-1.571 1.579-2.479.37-.456.785-.897 1.216-1.229C4.257 3.27 4.756 3 5.28 3 6.23 3 7 3.77 7 4.72V7.1l.5-.357V1.5A.5.5 0 0 1 8 1m3.21 8.907a.5.5 0 1 0 .58-.814l-2.5-1.786A.5.5 0 0 0 9 7.214V8.33z"></path>
                    </svg>
                    Upload
                </button>
            </div>
            {result && (
                <div>
                    <h3>Prediction Result:</h3>
                    <h3 style={{color:"red"}}>{labelInfo[result.class_name]?.name}</h3>
                    <p><strong>Description:</strong> {labelInfo[result.class_name]?.description}</p>
                    <p><strong>Advice:</strong> {labelInfo[result.class_name]?.advice}</p>
                    <p><em>Confidence: {(result.confidence * 100).toFixed(2)}%</em></p>
                </div>
            )}
        </div>
    );
}

export default ImageUpload;
