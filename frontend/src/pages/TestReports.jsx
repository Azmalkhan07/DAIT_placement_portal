import { useEffect, useMemo, useState } from "react";
import {
  getTestReports,
  addTestReport,
  updateTestReport,
  deleteTestReport,
  exportReportsCSV,
} from "../services/api";

function TestReports() {
  const emptyForm = {
    studentName: "",
    testName: "",
    score: "",
    department: "",
    result: "Pass",
  };

  const [reports, setReports] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [resultFilter, setResultFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const loadReports = async () => {
    const data = await getTestReports();
    setReports(data);
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateTestReport(editId, form);
      setEditId(null);
    } else {
      await addTestReport(form);
    }

    setForm(emptyForm);
    loadReports();
  };

  const handleEdit = (report) => {
    setEditId(report._id);
    setForm({
      studentName: report.studentName,
      testName: report.testName,
      score: report.score,
      department: report.department,
      result: report.result,
    });
  };

  const handleDelete = async (id) => {
    await deleteTestReport(id);

    if (editId === id) {
      setEditId(null);
      setForm(emptyForm);
    }

    loadReports();
  };

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        report.studentName.toLowerCase().includes(search.toLowerCase()) ||
        report.testName.toLowerCase().includes(search.toLowerCase()) ||
        report.department.toLowerCase().includes(search.toLowerCase());

      const matchesResult =
        resultFilter === "All" ? true : report.result === resultFilter;

      const matchesDepartment = departmentFilter
        ? report.department
            .toLowerCase()
            .includes(departmentFilter.toLowerCase())
        : true;

      return matchesSearch && matchesResult && matchesDepartment;
    });
  }, [reports, search, resultFilter, departmentFilter]);

  return (
    <div>
      <h2 className="page-title">Test Reports</h2>

      <div className="form-card">
        <form className="form-grid" onSubmit={handleSubmit}>
          <input
            name="studentName"
            placeholder="Student Name"
            value={form.studentName}
            onChange={handleChange}
            required
          />
          <input
            name="testName"
            placeholder="Test Name"
            value={form.testName}
            onChange={handleChange}
            required
          />
          <input
            name="score"
            type="number"
            placeholder="Score"
            value={form.score}
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
          <select
            name="result"
            value={form.result}
            onChange={handleChange}
            required
          >
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
          </select>

          <button className="primary-btn" type="submit">
            {editId ? "Update Report" : "Add Report"}
          </button>
        </form>

        {editId && (
          <button
            className="secondary-btn"
            style={{ marginTop: "12px" }}
            onClick={() => {
              setEditId(null);
              setForm(emptyForm);
            }}
          >
            Cancel Edit
          </button>
        )}
      </div>

      <div className="toolbar">
        <input
          className="toolbar-input"
          placeholder="Search student, test, department"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="toolbar-select"
          value={resultFilter}
          onChange={(e) => setResultFilter(e.target.value)}
        >
          <option value="All">All Results</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>

        <input
          className="toolbar-input"
          placeholder="Filter by department"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        />

        <button className="primary-btn" onClick={exportReportsCSV}>
          Export CSV
        </button>
      </div>

      <div className="table-card" style={{ marginTop: 20 }}>
        <div className="table-wrap">
          <table className="students-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Test</th>
                <th>Score</th>
                <th>Department</th>
                <th>Result</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <tr key={report._id}>
                    <td>{report.studentName}</td>
                    <td>{report.testName}</td>
                    <td>{report.score}</td>
                    <td>{report.department}</td>
                    <td>{report.result}</td>
                    <td className="action-cell">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(report)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(report._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No test reports found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TestReports;