import { useState } from "react";
import { uploadResume, uploadProfileImage } from "../services/api";

function Resume({ user, onUserUpdate }) {
  const [resumeName, setResumeName] = useState("");
  const [imageName, setImageName] = useState("");

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResumeName(file.name);
    const data = await uploadResume(user._id, file);

    if (data.success) {
      onUserUpdate(data.user);
    }
  };

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageName(file.name);
    const data = await uploadProfileImage(user._id, file);

    if (data.success) {
      onUserUpdate(data.user);
    }
  };

  return (
    <div>
      <h2 className="page-title">My Resume & Profile</h2>

      <div className="panel-card">
        <div className="input-group">
          <label>Upload Profile Image</label>
          <input type="file" accept="image/*" onChange={handleProfileUpload} />
        </div>

        <div style={{ marginTop: "16px", color: "#9fb0d8" }}>
          {imageName ? `Uploaded Image: ${imageName}` : "No new image uploaded"}
        </div>

        {user?.profileImageUrl && (
          <div style={{ marginTop: "16px" }}>
            <img
              src={`http://localhost:5000${user.profileImageUrl}`}
              alt="profile"
              className="profile-preview"
            />
          </div>
        )}

        <div className="input-group" style={{ marginTop: "24px" }}>
          <label>Upload Resume</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
        </div>

        <div style={{ marginTop: "16px", color: "#9fb0d8" }}>
          {resumeName ? `Uploaded Resume: ${resumeName}` : "No new resume uploaded"}
        </div>

        {user?.resumeUrl && (
          <div style={{ marginTop: "16px" }}>
            <a
              href={`http://localhost:5000${user.resumeUrl}`}
              target="_blank"
              rel="noreferrer"
              className="link-btn"
            >
              View Current Resume
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Resume;