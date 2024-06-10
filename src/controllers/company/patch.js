const Company = require("../../models/Company");
const Document = require("../../models/Company/Document");

const addCompany = async (req, res) => {
  const { id } = req.user;
  const { name } = req.body;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const newCompany = new Company({ name, recruiter: id });
    const savedCompany = await newCompany.save();

    userExists.company = savedCompany.id;
    await userExists.save();

    return res
      .status(201)
      .json({ message: "Company Profile Created Successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const updateCompanyInfo = async (req, res) => {
  const { id } = req.user;
  const body = req.body;
  const companyId = req.params.companyId;

  try {
    const userExists = await User.findById(id);
    const companyExists = await Company.findById(companyId);

    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    if (!companyExists) {
      return res.status(404).json({ error: "Company not found." });
    }

    await Company.findByIdAndUpdate(companyId, body);

    return res
      .status(200)
      .json({ message: "Company profile updated successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const updateCompanyDocument = async (req, res) => {
  const { id } = req.user;
  const body = req.body;
  const companyId = req.params.companyId;

  body.company = companyId;

  try {
    const userExists = await User.findById(id);
    const companyExists = await Company.findById(companyId);

    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    if (!companyExists) {
      return res.status(404).json({ error: "Company not found." });
    }

    const newDoc = new Document(body);
    const savedDoc = await newDoc.save();

    companyExists.documents = companyExists.documents.concat(savedDoc.id);
    await companyExists.save();

    return res.status(201).json({ message: "Document saved successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports = { addCompany, updateCompanyInfo, updateCompanyDocument };
