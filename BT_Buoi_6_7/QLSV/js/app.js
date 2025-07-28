// Toàn bộ mã JS sẽ chạy sau khi cây DOM đã được tải hoàn chỉnh.
document.addEventListener('DOMContentLoaded', function() {
  // --- Lấy các phần tử DOM ---
  const form = document.getElementById('studentForm');
  const submitBtn = document.getElementById('submitBtn');
  const tableBody = document.getElementById('studentTableBody');
  const notification = document.getElementById('notification');

  let editMode = false;
  let editRow = null;

  // --- Hàm hiển thị thông báo ---
  function showNotification(message, isSuccess) {
    notification.textContent = message;
    notification.className = isSuccess ? 'alert alert-success' : 'alert alert-danger';
    notification.style.display = 'block';

    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
      notification.style.display = 'none';
    }, 3000);
  }
  
  // --- Hàm làm sạch các ô input và bỏ đánh dấu lỗi ---
  function resetForm() {
    form.reset();
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    document.getElementById('maSV').readOnly = false;
    submitBtn.textContent = 'Thêm sinh viên';
    editMode = false;
    editRow = null;
  }

  // --- Hàm xác thực dữ liệu (Validation) ---
  function validateInputs() {
    const maSV = document.getElementById('maSV');
    const hoTen = document.getElementById('hoTen');
    const email = document.getElementById('email');
    let isValid = true;
    
    // Bỏ các đánh dấu lỗi cũ
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

    // 1. Kiểm tra rỗng
    if (maSV.value.trim() === '') {
        maSV.classList.add('is-invalid');
        isValid = false;
    }
    if (hoTen.value.trim() === '') {
        hoTen.classList.add('is-invalid');
        isValid = false;
    }
    if (email.value.trim() === '') {
        email.classList.add('is-invalid');
        isValid = false;
    }
    
    // 2. Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() !== '' && !emailRegex.test(email.value.trim())) {
        email.classList.add('is-invalid');
        isValid = false;
    }

    // 3. Kiểm tra trùng Mã SV (chỉ khi thêm mới)
    if (!editMode) {
      const studentIds = Array.from(tableBody.querySelectorAll('tr td:nth-child(2)'));
      const isDuplicate = studentIds.some(td => td.textContent === maSV.value.trim());
      if (isDuplicate) {
        maSV.classList.add('is-invalid');
        showNotification('Lỗi: Mã sinh viên đã tồn tại!', false);
        return false; // Dừng ngay lập tức nếu trùng
      }
    }

    if (!isValid) {
      showNotification('Lỗi: Vui lòng điền đúng và đủ thông tin!', false);
    }

    return isValid;
  }

  // --- Sự kiện submit Form (Thêm hoặc Cập nhật) ---
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn hành vi mặc định của form

    if (!validateInputs()) {
      return; // Dừng nếu dữ liệu không hợp lệ
    }

    // Lấy dữ liệu từ form
    const maSV = document.getElementById('maSV').value.trim();
    const hoTen = document.getElementById('hoTen').value.trim();
    const email = document.getElementById('email').value.trim();
    const ngaySinh = document.getElementById('ngaySinh').value;
    const gioiTinh = document.querySelector('input[name="gioiTinh"]:checked').value;

    if (editMode) {
      // --- Cập nhật sinh viên ---
      const cells = editRow.children;
      cells[1].textContent = maSV;
      cells[2].textContent = hoTen;
      cells[3].textContent = email;
      cells[4].textContent = gioiTinh;
      cells[5].textContent = ngaySinh;
      
      showNotification('Cập nhật thông tin sinh viên thành công!', true);
      resetForm();

    } else {
      // --- Thêm mới sinh viên ---
      const stt = tableBody.rows.length + 1;
      const newRow = tableBody.insertRow();
      
      newRow.innerHTML = `
        <td>${stt}</td>
        <td>${maSV}</td>
        <td>${hoTen}</td>
        <td>${email}</td>
        <td>${gioiTinh}</td>
        <td>${ngaySinh}</td>
        <td class="action-buttons">
          <button class="btn btn-success btn-sm btn-edit mb-2">Sửa</button>
          <button class="btn btn-danger btn-sm btn-delete">Xoá</button>
        </td>
      `;
      
      showNotification('Thêm sinh viên thành công!', true);
      resetForm();
    }
  });
  
  // --- Sự kiện click trên Bảng (Sử dụng Event Delegation cho nút Sửa/Xoá) ---
  tableBody.addEventListener('click', function(e) {
    const target = e.target;
    
    // --- Xử lý nút Xoá ---
    if (target.classList.contains('btn-delete')) {
      const rowToDelete = target.closest('tr');
      if (confirm('Bạn có chắc chắn muốn xoá sinh viên này?')) {
        rowToDelete.remove();
        showNotification('Đã xoá sinh viên thành công!', true);
        
        // Cập nhật lại số thứ tự
        Array.from(tableBody.rows).forEach((row, index) => {
            row.cells[0].textContent = index + 1;
        });
      }
    }
    
    // --- Xử lý nút Sửa ---
if (target.classList.contains('btn-edit')) {
  editRow = target.closest('tr');
  const cells = editRow.children;

  // Đổ dữ liệu từ bảng lên form
  document.getElementById('maSV').value = cells[1].textContent;
  document.getElementById('hoTen').value = cells[2].textContent;
  document.getElementById('email').value = cells[3].textContent;
  document.getElementById('ngaySinh').value = cells[5].textContent;
  
  // ===== SỬA LỖI Ở ĐÂY =====
  // Kiểm tra giới tính một cách tường minh
  const gioiTinh = cells[4].textContent;
  if (gioiTinh === 'Nữ') {
    document.getElementById('nu').checked = true;
  } else {
    document.getElementById('nam').checked = true;
  }
  // ==========================

  // Chuyển sang chế độ "Sửa"
  editMode = true;
  submitBtn.textContent = 'Cập nhật';
  document.getElementById('maSV').readOnly = true; // Không cho sửa Mã SV
  window.scrollTo(0, 0); // Cuộn lên đầu trang để thấy form
}
  });
});