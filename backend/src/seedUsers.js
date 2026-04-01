const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const connectDB = require("./config/db");
const User = require("./models/User");

const seedUsers = async () => {
  try {
    await connectDB();

    const users = [
      {
        name: "Admin",
        email: "admin@gmail.com",
        password: "123456",
        role: "Faculty Admin",
        department: "Placement Cell",
        year: "",
      },
      {
        name: "Student User",
        email: "student@gmail.com",
        password: "123456",
        role: "Student",
        department: "CSE",
        year: "4th Year",
      },
    ];

    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        await User.create({
          ...userData,
          password: hashedPassword,
        });

        console.log(`${userData.email} created`);
      } else {
        console.log(`${userData.email} already exists`);
      }
    }

    console.log("Seed completed");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seed failed:", error.message);
    mongoose.connection.close();
  }
};

seedUsers();