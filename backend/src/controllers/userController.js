const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const { role, department, year, search } = req.query;

    const filter = {};

    if (role) filter.role = role;
    if (department) filter.department = department;
    if (year) filter.year = year;

    let users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    if (search) {
      const q = search.toLowerCase();
      users = users.filter(
        (user) =>
          user.name.toLowerCase().includes(q) ||
          user.email.toLowerCase().includes(q) ||
          user.department.toLowerCase().includes(q)
      );
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

const uploadResume = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume file uploaded",
      });
    }

    const resumeUrl = `/uploads/resumes/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      id,
      { resumeUrl },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Resume uploaded successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Resume upload failed",
    });
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No profile image uploaded",
      });
    }

    const profileImageUrl = `/uploads/profiles/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      id,
      { profileImageUrl },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Profile image uploaded successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Profile image upload failed",
    });
  }
};

module.exports = {
  getUsers,
  uploadResume,
  uploadProfileImage,
};