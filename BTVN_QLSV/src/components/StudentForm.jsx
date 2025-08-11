import React, { useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function StudentForm({ onAdd, onUpdate, editingStudent, setEditingStudent }) {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [dob, setDob] = useState("");
  const [score, setScore] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setClassName(editingStudent.className);
      setDob(
        editingStudent.dob
          ? new Date(editingStudent.dob).toISOString().split("T")[0]
          : ""
      );
      setScore(editingStudent.score);
      setEmail(editingStudent.email || "");
      setGender(editingStudent.gender || "");
      setNote(editingStudent.note || "");
    } else {
      setName("");
      setClassName("");
      setDob("");
      setScore("");
      setEmail("");
      setGender("");
      setNote("");
    }
  }, [editingStudent]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !className.trim() || !dob || score === "" || !email.trim() || !gender) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (isNaN(score) || score < 0 || score > 10) {
      alert("Điểm TB phải từ 0 đến 10!");
      return;
    }

    const studentData = {
      id: editingStudent ? editingStudent.id : Date.now(),
      name,
      className,
      dob,
      score: parseFloat(score),
      email,
      gender,
      note
    };

    if (editingStudent) {
      onUpdate(studentData);
    } else {
      onAdd(studentData);
    }
  };


  return (
    <div className="modal fade" id="addStudentModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{editingStudent ? "Sửa sinh viên" : "Thêm sinh viên"}</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body d-flex flex-column gap-2">
              <input type="text" className="form-control mb-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Họ tên" />
              <input type="text" className="form-control mb-2" value={className} onChange={(e) => setClassName(e.target.value)} placeholder="Lớp" />
              <input type="date" className="form-control mb-2" value={dob} onChange={(e) => setDob(e.target.value)} />
              <input type="number" className="form-control mb-2" value={score} onChange={(e) => setScore(e.target.value)} step="0.1" placeholder="Điểm TB" />
              <input type="email" className="form-control mb-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

              <select className="form-control mb-2" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">-- Chọn giới tính --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>

              <textarea className="form-control mb-2" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ghi chú"></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
              <button
                type="submit"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                {editingStudent ? "Cập nhật" : "Thêm"}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
