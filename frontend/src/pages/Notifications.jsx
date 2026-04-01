import { useEffect, useMemo, useState } from "react";
import {
  getNotifications,
  addNotification,
  updateNotification,
  deleteNotification,
} from "../services/api";

function Notifications() {
  const emptyForm = {
    title: "",
    message: "",
    audience: "",
    date: "",
  };

  const [notifications, setNotifications] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const loadNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateNotification(editId, form);
      setEditId(null);
    } else {
      await addNotification(form);
    }

    setForm(emptyForm);
    loadNotifications();
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({
      title: item.title,
      message: item.message,
      audience: item.audience,
      date: item.date,
    });
  };

  const handleDelete = async (id) => {
    await deleteNotification(id);
    if (editId === id) {
      setEditId(null);
      setForm(emptyForm);
    }
    loadNotifications();
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.message.toLowerCase().includes(search.toLowerCase()) ||
        item.audience.toLowerCase().includes(search.toLowerCase())
    );
  }, [notifications, search]);

  return (
    <div>
      <h2 className="page-title">Notifications</h2>

      <div className="form-card">
        <form className="form-grid form-grid-4" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Notification Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            name="audience"
            placeholder="Audience"
            value={form.audience}
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
          <button className="primary-btn" type="submit">
            {editId ? "Update Notification" : "Post Notification"}
          </button>
        </form>

        <div style={{ marginTop: "12px" }}>
          <textarea
            name="message"
            placeholder="Notification Message"
            value={form.message}
            onChange={handleChange}
            required
            className="big-textarea"
          />
        </div>
      </div>

      <div className="toolbar">
        <input
          className="toolbar-input"
          placeholder="Search title, message, audience"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="info-list" style={{ marginTop: "20px" }}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => (
            <div className="info-row" key={item._id}>
              <div className="info-row-left">
                <h4>{item.title}</h4>
                <p>{item.message}</p>
                <p>
                  <strong>Audience:</strong> {item.audience} | <strong>Date:</strong>{" "}
                  {item.date}
                </p>
              </div>
              <div className="action-stack">
                <button className="edit-btn" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="panel-card empty-card">No notifications found</div>
        )}
      </div>
    </div>
  );
}

export default Notifications;