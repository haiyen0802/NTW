export default function Detail({ viewingStudent }) {
    return (
        <div
            className="modal fade"
            id="viewStudentModal"
            tabIndex="-1"
            aria-labelledby="viewStudentModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title" id="viewStudentModalLabel">
                            Thông tin sinh viên
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        {viewingStudent && (
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Mã sinh viên:</strong> {viewingStudent.id}</p>
                                    <p><strong>Họ tên:</strong> {viewingStudent.name}</p>
                                    <p><strong>Lớp:</strong> {viewingStudent.className}</p>
                                    <p><strong>Ngày sinh:</strong> {new Date(viewingStudent.dob).toLocaleDateString("vi-VN")}</p>
                                    <p><strong>Điểm TB:</strong> {viewingStudent.score}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Email:</strong> {viewingStudent.email}</p>
                                    <p><strong>Giới tính:</strong> {viewingStudent.gender}</p>
                                    <p><strong>Ghi chú:</strong> {viewingStudent.note}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
