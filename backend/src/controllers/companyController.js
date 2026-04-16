const Company = require("../models/Company");

const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ success: false, message: "Failed to fetch companies" });
  }
};

const addCompany = async (req, res) => {
  try {
    const { name, location, industry, website, recruiterEmail, recruiterPhone } = req.body;

    // Input validation
    if (!name || !location || !industry) {
      return res.status(400).json({
        success: false,
        message: "Name, location, and industry are required",
      });
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid company name",
      });
    }

    if (recruiterEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recruiterEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const company = await Company.create({
      name: name.trim(),
      location: location.trim(),
      industry: industry.trim(),
      website: website ? website.trim() : '',
      recruiterEmail: recruiterEmail ? recruiterEmail.toLowerCase().trim() : '',
      recruiterPhone: recruiterPhone ? recruiterPhone.trim() : '',
    });

    res.json({
      success: true,
      message: "Company added successfully",
      company,
    });
  } catch (error) {
    console.error("Error adding company:", error);
    res.status(500).json({ success: false, message: "Failed to add company" });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID",
      });
    }

    // Whitelist allowed fields to prevent mass assignment
    const allowedFields = ['name', 'location', 'industry', 'website', 'recruiterEmail', 'recruiterPhone'];
    const updateData = {};
    
    allowedFields.forEach(field => {
      if (req.body.hasOwnProperty(field) && req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const company = await Company.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ success: false, message: "Failed to update company" });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID",
      });
    }

    const company = await Company.findByIdAndDelete(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ success: false, message: "Failed to delete company" });
  }
};

module.exports = {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
};