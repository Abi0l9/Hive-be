const { User } = require("../../models/User");
const Company = require("../../models/Company");
const Document = require("../../models/Company/Document");

const deleteMyCompanyDocuments = async (req, res) => {
  const { id } = req.user;
  const body = req.body;
  const docId = req.params.docId;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const companyId = userExists.company;
    const companyExists = await Company.findById(companyId);

    if (!companyExists) {
      return res.status(404).json({ error: "Company not found." });
    }

    const docExists = await Document.findById(docId);

    if (!docExists) {
      return res.status(404).json({ error: "Document history not found." });
    }

    await Document.findByIdAndDelete(docId);
    companyExists.documents = companyExists.documents.filter(
      (doc) => doc._id.toString() !== docId
    );
    await companyExists.save();

    return res.status(200).json({ message: "Document  deleted successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports = { deleteMyCompanyDocuments };
