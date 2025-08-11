export default function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark px-4 py-3 shadow-sm">
            <span className="navbar-brand fw-bold fs-5">Trường Đại học Thủy lợi</span>

            <div className="d-flex align-items-center gap-4">
                <ul className="d-flex list-unstyled mb-0 gap-3">
                    <li>
                        <a
                            className="nav-link active text-white fw-bold nav-hover"
                            href="#"
                        >
                            Trang chủ
                        </a>
                    </li>
                    <li>
                        <a
                            className="nav-link text-secondary nav-hover"
                            href="#"
                        >
                            Quản lý sinh viên
                        </a>
                    </li>
                </ul>

                <div className="d-flex">
                    <input
                        className="form-control-sm"
                        type="search"
                        placeholder="Nhập nội dung tìm kiếm"
                    />
                    <button className="ms-2 btn btn-sm btn-outline-success">
                        Tìm kiếm
                    </button>
                </div>
            </div>

            <style>{`
                .nav-hover {
                    transition: color 0.3s ease, transform 0.2s ease;
                }
                .nav-hover:hover {
                    color: #fff !important;
                    transform: scale(1.05);
                }
                .navbar {
                    transition: background-color 0.3s ease;
                }
                .navbar:hover {
                    background-color: #1a1a1a;
                }
            `}</style>
        </nav>
    );
}
