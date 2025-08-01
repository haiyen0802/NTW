// script.js

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  return date.toLocaleDateString('vi-VN', options).replace(',', '');
}

function renderTransactions() {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  transactions.forEach(tr => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="checkbox" /></td>
      <td class="table-actions">
        <i class="btn btn-sm text-dark btn-primary"><i class="fa-solid fa-eye"></i></i>
        <i class="btn btn-sm text-dark btn-warning"><i class="fa-solid fa-pen"></i></i>
        <i class="btn btn-sm text-dark btn-danger"><i class="fa-solid fa-circle-xmark"></i></i>
      </td>
      <td>${tr.id}</td>
      <td>${tr.customer}</td>
      <td>${tr.staff}</td>
      <td>${tr.amount.toLocaleString()}</td>
      <td>${formatDate(tr.date)}</td>
    `;
    tbody.appendChild(row);
  });
}

function setupAddTransactionForm() {
  const form = document.getElementById("transactionForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const customer = document.getElementById("customer").value.trim();
    const staff = document.getElementById("staff").value.trim();
    const amount = parseInt(document.getElementById("amount").value);

    if (!customer || !staff || !amount || isNaN(amount)) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const newTransaction = {
      id: Date.now(), // đơn giản để tạo id
      customer,
      staff,
      amount,
      date: new Date().toISOString()
    };

    transactions.unshift(newTransaction); // thêm lên đầu danh sách
    renderTransactions();

    // Reset form & đóng modal
    form.reset();
    const modalEl = document.getElementById('addTransactionModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTransactions();
  setupAddTransactionForm();
});
