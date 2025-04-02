import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const maskPhoneNumber = (phone) => {
    if (!phone) return "";
    const visibleDigits = 2;
    const maskedLength = phone.length - visibleDigits;
    if (maskedLength <= 0) return phone;
    return "*".repeat(maskedLength) + phone.slice(-visibleDigits);
};

const maskAddress = (address) => {
    if (!address) return "";
    return address
        .split(" ")
        .map((word, index) => (index < 2 ? "****" : word))
        .join(" ");
};

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://127.0.0.1:5000/students");
            setStudents(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            console.error("Error fetching students:", err);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleDelete = (id) => {
        axios
            .delete(`http://127.0.0.1:5000/students/${id}`)
            .then(() => {
                setStudents((prevStudents) =>
                    prevStudents.filter((student) => student.StudentID !== id)
                );
            })
            .catch((err) => {
                console.error("Error deleting student:", err);
                setError("Failed to delete student.");
            });
    };

    if (loading) {
        return <div className="loading">Loading student data...</div>;
    }

    if (error) {
        return <div className="error">Error loading student data: {error}</div>;
    }

    return (
        <div className="student-list-container container">
            <h2>Student List</h2>
            <Link to="/add" className="add-button">
                Add New Student
            </Link>
            <table className="student-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Year</th>
                        <th>GPA</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.StudentID}>
                            <td>{student.Name}</td>
                            <td>{student.Year}</td>
                            <td>{student.GPA}</td>
                            <td>{maskPhoneNumber(student.PhoneNumber)}</td>
                            <td>{maskAddress(student.Address)}</td>
                            <td className="actions-td">
                                <Link to={`/edit/${student.StudentID}`} className="edit-button">
                                    Edit
                                </Link>{" "}
                                <button onClick={() => handleDelete(student.StudentID)} className="delete-button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export { StudentList };