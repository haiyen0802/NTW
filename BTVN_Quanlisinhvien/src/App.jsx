import React, { useState } from "react";
import { initialStudents } from "./data";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import Detail from "./components/Detail";

export default function App() {
  const [students, setStudents] = useState(initialStudents);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);

  const resultsPerPage = 5;

  const addStudent = (student) => {
    setStudents([student, ...students]);
  };

  const updateStudent = (updated) => {
    setStudents(students.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };


  const handleView = (student) => {
    setViewingStudent(student);
  };

  const indexOfLast = currentPage * resultsPerPage;
  const indexOfFirst = indexOfLast - resultsPerPage;
  const currentStudents = students.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(students.length / resultsPerPage);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container mt-4 flex-grow-1 d-flex flex-column">
        <div className="d-flex justify-content-between mb-3 align-items-center flex-wrap">
          <div className="mb-2">
            <button
              className="btn btn-sm text-white me-2"
              style={{ backgroundColor: "#5bc1f0", border: "none" }}
              data-bs-toggle="modal"
              data-bs-target="#addStudentModal"
              onClick={() => setEditingStudent(null)}
            >
              <i className="fa-solid fa-circle-plus"></i> THÊM
            </button>
            <button className="btn btn-outline-secondary btn-sm">
              <i className="fa-solid fa-arrow-up-from-bracket"></i> XUẤT RA FILE{" "}
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>

          <div
            className="d-flex align-items-center justify-content-center flex-grow-1 mb-2"
            style={{ maxWidth: "500px" }}
          >
            <div
              className="input-group"
              style={{
                border: "1px solid #dee2e6",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            >
              <span
                className="input-group-text"
                style={{ background: "#f1f1f1", border: "none" }}
              >
                <i className="fa-solid fa-angle-right"></i>
              </span>
              <input
                className="form-control border-0 shadow-none"
                type="text"
                placeholder="Tìm kiếm sinh viên"
              />
              <span
                className="input-group-text"
                style={{ background: "#f1f1f1", border: "none" }}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center ms-3 mb-2">
            <label htmlFor="resultCount" className="me-2 mb-0">
              Kết quả
            </label>
            <select
              id="resultCount"
              className="form-select form-select-sm"
              style={{ width: "70px" }}
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
            </select>
          </div>
        </div>

        <div className="flex-grow-1 overflow-auto">
          <StudentList
            students={currentStudents}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={(id) => setStudents(students.filter(s => s.id !== id))}
          />
        </div>

        <nav className="mt-4 d-flex justify-content-between align-items-center flex-wrap">
          <ul className="pagination justify-content-center mb-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
          <div className="text-end text-muted small">
            Hiển thị {currentStudents.length} / {students.length} sinh viên
          </div>
        </nav>
      </div>

      <StudentForm
        onAdd={addStudent}
        onUpdate={updateStudent}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
      />

      <Detail viewingStudent={viewingStudent} />

      <Footer />
    </div>
  );
}
