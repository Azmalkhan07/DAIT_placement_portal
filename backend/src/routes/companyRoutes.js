const express = require("express");
const router = express.Router();

const {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

router.get("/", getCompanies);
router.post("/", addCompany);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

module.exports = router;