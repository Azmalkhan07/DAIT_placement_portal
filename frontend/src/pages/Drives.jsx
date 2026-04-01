import { useEffect, useMemo, useState } from "react";
import {
  getDrives,
  addDrive,
  updateDrive,
  deleteDrive,
} from "../services/api";

function Drives() {
  const emptyForm = {
    company: "",
    date: "",
    venue: "",
    eligibility: "",
    status: "Upcoming",
  };

  const [drives, setDrives] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const loadDrives = async () => {
    const data = await getDrives();
    setDrives(data);
  };

  useEffect(() => {
    loadDrives();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateDrive(editId, form);
      setEditId(null);
    } else {
      await addDrive(form);
    }

    setForm(emptyForm);
    loadDrives();
  };

  const handleEdit = (drive) => {
    setEditId(drive._id);
    setForm({
      company: drive.company,
      date: drive.date,
      venue: drive.venue,
      eligibility: drive.eligibility,
      status: drive.status,
    });
  };

  const handleDelete = async (id) => {
    await deleteDrive(id);
    if (editId === id) {
      setEditId(null);
      setForm(emptyForm);
    }
    loadDrives();
  };

  const filteredDrives = useMemo(() => {
    return drives.filter(
      (drive) =>
        drive.company.toLowerCase().includes(search.toLowerCase()) ||
        drive.venue.toLowerCase().includes(search.toLowerCase()) ||
        drive.eligibility.toLowerCase().includes(search.toLowerCase())
    );
  }, [drives, search]);

  return (
    <div>
      <h2 className="page-title">Placement Drives</h2>

      <div className="form-card">
        <form className="form-grid" onSubmit={handleSubmit}>
          <input
            name="company"
            placeholder="Company Name"
            value={form.company}
            onChange={handleChange}
            required
          />
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <input
            name="venue"
            placeholder="Venue"
            value={form.venue}
            onChange={handleChange}
            required
          />
          <input
            name="eligibility"
            placeholder="Eligibility"
            value={form.eligibility}
            onChange={handleChange}
            required
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>

          <button className="primary-btn" type="submit">
            {editId ? "Update Drive" : "Add Drive"}
          </button>
        </form>
      </div>

      <div className="toolbar">
        <input
          className="toolbar-input"
          placeholder="Search company, venue, eligibility"
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
                <th>Date</th>
                <th>Venue</th>
                <th>Eligibility</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrives.length > 0 ? (
                filteredDrives.map((drive) => (
                  <tr key={drive._id}>
                    <td>{drive.company}</td>
                    <td>{drive.date}</td>
                    <td>{drive.venue}</td>
                    <td>{drive.eligibility}</td>
                    <td>{drive.status}</td>
                    <td className="action-cell">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(drive)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(drive._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No drives found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Drives;