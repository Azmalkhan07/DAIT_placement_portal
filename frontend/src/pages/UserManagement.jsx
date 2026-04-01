import { useEffect, useState } from "react";
import {
  getUsers,
  uploadResume,
  uploadProfileImage,
} from "../services/api";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  const loadUsers = async () => {
    const data = await getUsers({
      role: "Student",
      search,
      department,
      year,
    });
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, [search, department, year]);

  const handleResumeUpload = async (userId, file) => {
    if (!file) return;
    await uploadResume(userId, file);
    loadUsers();
  };

  const handleProfileUpload = async (userId, file) => {
    if (!file) return;
    await uploadProfileImage(userId, file);
    loadUsers();
  };

  return (
    <div>
      <h2 className="page-title">Student User Management</h2>

      <div className="toolbar">
        <input
          className="toolbar-input"
          placeholder="Search name, email, department"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          className="toolbar-input"
          placeholder="Filter by department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          className="toolbar-input"
          placeholder="Filter by year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <div className="table-card" style={{ marginTop: 20 }}>
        <div className="table-wrap">
          <table className="students-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Year</th>
                <th>Resume</th>
                <th>Profile Upload</th>
                <th>Resume Upload</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {user.profileImageUrl ? (
                        <img
                          src={`http://localhost:5000${user.profileImageUrl}`}
                          alt="profile"
                          className="profile-thumb"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.department}</td>
                    <td>{user.year}</td>
                    <td>
                      {user.resumeUrl ? (
                        <a
                          href={`http://localhost:5000${user.resumeUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="link-btn"
                        >
                          View Resume
                        </a>
                      ) : (
                        "No Resume"
                      )}
                    </td>
                    <td>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleProfileUpload(user._id, e.target.files[0])
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) =>
                          handleResumeUpload(user._id, e.target.files[0])
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No student users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;