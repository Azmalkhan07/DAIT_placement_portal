import { useEffect, useMemo, useState } from "react";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  exportStudentsCSV,
} from "../services/api";

function Students() {
  const emptyForm = {
    name: "",
    email: "",
    department: "",
    year: "",
    status: "Eligible",
  };

  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  const loadStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateStudent(editId, form);
      setEditId(null);
    } else {
      await addStudent(form);
    }

    setForm(emptyForm);
    loadStudents();
  };

  const handleEdit = (student) => {
    setEditId(student._id);
    setForm({
      name: student.name,
      email: student.email,
      department: student.department,
      year: student.year,
      status: student.status,
    });
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);

    if (editId === id) {
      setEditId(null);
      setForm(emptyForm);
    }

    loadStudents();
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm(emptyForm);
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase()) ||
        student.department.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ? true : student.status === statusFilter;

      const matchesDepartment = departmentFilter
        ? student.department
            .toLowerCase()
            .includes(departmentFilter.toLowerCase())
        : true;

      const matchesYear = yearFilter
        ? student.year.toLowerCase().includes(yearFilter.toLowerCase())
        : true;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment &&
        matchesYear
      );
    });
  }, [students, search, statusFilter, departmentFilter, yearFilter]);

  return (
    <div>
      <h2 className="page-title">Students</h2>

      <div className="form-card">
        <form className="form-grid" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Student Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Student Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            required
          />
          <input
            name="year"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
            required
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value="Eligible">Eligible</option>
            <option value="Training">Training</option>
            <option value="Placed">Placed</option>
          </select>

          <button className="primary-btn" type="submit">
            {editId ? "Update Student" : "Add Student"}
          </button>
        </form>

        {editId && (
          <button
            className="secondary-btn"
            style={{ marginTop: "12px" }}
            onClick={handleCancelEdit}
          >
            Cancel Edit
          </button>
        )}
      </div>

      <div className="toolbar">
        <input
          className="toolbar-input"
          placeholder="Search by name, email, department"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="toolbar-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Eligible">Eligible</option>
          <option value="Training">Training</option>
          <option value="Placed">Placed</option>
        </select>

        <input
          className="toolbar-input"
          placeholder="Filter by department"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        />

        <input
          className="toolbar-input"
          placeholder="Filter by year"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        />

        <button className="primary-btn" onClick={exportStudentsCSV}>
          Export CSV
        </button>
      </div>

      <div className="table-card" style={{ marginTop: 20 }}>
        <div className="table-wrap">
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Year</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.department}</td>
                    <td>{student.year}</td>
                    <td>{student.status}</td>
                    <td className="action-cell">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(student)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(student._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No students found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Students;