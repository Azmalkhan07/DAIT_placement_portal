import { useEffect, useMemo, useState } from "react";
import {
  getSchedules,
  addSchedule,
  updateSchedule,
  deleteSchedule,
} from "../services/api";

function ScheduleTraining() {
  const emptyForm = {
    title: "",
    trainer: "",
    department: "",
    date: "",
    time: "",
    venue: "",
  };

  const [schedules, setSchedules] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const loadSchedules = async () => {
    const data = await getSchedules();
    setSchedules(data);
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateSchedule(editId, form);
      setEditId(null);
    } else {
      await addSchedule(form);
    }

    setForm(emptyForm);
    loadSchedules();
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({
      title: item.title,
      trainer: item.trainer,
      department: item.department,
      date: item.date,
      time: item.time,
      venue: item.venue,
    });
  };

  const handleDelete = async (id) => {
    await deleteSchedule(id);
    if (editId === id) {
      setEditId(null);
      setForm(emptyForm);
    }
    loadSchedules();
  };

  const filteredSchedules = useMemo(() => {
    return schedules.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.trainer.toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase()) ||
        item.venue.toLowerCase().includes(search.toLowerCase())
    );
  }, [schedules, search]);

  return (
    <div>
      <h2 className="page-title">Schedule Training</h2>

      <div className="form-card">
        <form className="form-grid form-grid-6" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Training Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            name="trainer"
            placeholder="Trainer Name"
            value={form.trainer}
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
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <input
            name="time"
            placeholder="Time"
            value={form.time}
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

          <button className="primary-btn" type="submit">
            {editId ? "Update Schedule" : "Add Schedule"}
          </button>
        </form>
      </div>

      <div className="toolbar">
        <input
          className="toolbar-input"
          placeholder="Search title, trainer, department, venue"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-card" style={{ marginTop: 20 }}>
        <div className="table-wrap">
          <table className="students-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Trainer</th>
                <th>Department</th>
                <th>Date</th>
                <th>Time</th>
                <th>Venue</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedules.length > 0 ? (
                filteredSchedules.map((item) => (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.trainer}</td>
                    <td>{item.department}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.venue}</td>
                    <td className="action-cell">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No schedules found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ScheduleTraining;