import { useEffect, useMemo, useState } from "react";
import {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
} from "../services/api";

function Companies() {
  const emptyForm = {
    name: "",
    role: "",
    package: "",
    location: "",
    status: "Active",
  };

  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const loadCompanies = async () => {
    const data = await getCompanies();
    setCompanies(data);
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateCompany(editId, form);
      setEditId(null);
    } else {
      await addCompany(form);
    }

    setForm(emptyForm);
    loadCompanies();
  };

  const handleEdit = (company) => {
    setEditId(company._id);
    setForm({
      name: company.name,
      role: company.role,
      package: company.package,
      location: company.location,
      status: company.status,
    });
  };

  const handleDelete = async (id) => {
    await deleteCompany(id);
    if (editId === id) {
      setEditId(null);
      setForm(emptyForm);
    }
    loadCompanies();
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter(
      (company) =>
        company.name.toLowerCase().includes(search.toLowerCase()) ||
        company.role.toLowerCase().includes(search.toLowerCase()) ||
        company.location.toLowerCase().includes(search.toLowerCase())
    );
  }, [companies, search]);

  return (
    <div>
      <h2 className="page-title">Companies</h2>

      <div className="form-card">
        <form className="form-grid" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Company Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            required
          />
          <input
            name="package"
            placeholder="Package"
            value={form.package}
            onChange={handleChange}
            required
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value="Active">Active</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>

          <button className="primary-btn" type="submit">
            {editId ? "Update Company" : "Add Company"}
          </button>
        </form>
      </div>

      <div className="toolbar">
        <input
          className="toolbar-input"
          placeholder="Search company, role, location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-card" style={{ marginTop: 20 }}>
        <div className="table-wrap">
          <table className="students-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Package</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <tr key={company._id}>
                    <td>{company.name}</td>
                    <td>{company.role}</td>
                    <td>{company.package}</td>
                    <td>{company.location}</td>
                    <td>{company.status}</td>
                    <td className="action-cell">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(company)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(company._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No companies found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Companies;