import React from "react";

export default function StudentList({ students, onView, onEdit, onDelete }) {
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("vi-VN");

  return (
    <div className="table-responsive">
      <table className="table table-bordered align-middle text-center">
        <thead className="table-dark">
          <tr>
            <th>Họ tên</th>
            <th>Lớp</th>
            <th>Ngày sinh</th>
            <th>Điểm TB</th>
            <th>Email</th>
            <th>Ghi chú</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="10">Không có sinh viên</td>
            </tr>
          ) : (
            students.map((st) => (
              <tr key={st.id}>
                <td>{st.name}</td>
                <td>{st.className}</td>
                <td>{formatDate(st.dob)}</td>
                <td>{st.score}</td>
                <td>{st.email}</td>
                <td>{st.note}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#viewStudentModal"
                    onClick={() => onView(st)}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-warning me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#addStudentModal"
                    onClick={() => onEdit(st)}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(st.id)}
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
