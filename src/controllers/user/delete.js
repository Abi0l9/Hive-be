const { User } = require("../../models/User");
const { Education } = require("../../models/User/Education");
const { Work } = require("../../models/User/Work");
const { Document } = require("../../models/User/Document");

const deleteUserEducation = async (req, res) => {
  const { id } = req.user;
  const body = req.body;
  const eduId = req.params.eduId;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    //confirms if a previous record exists
    const eduExists = await Education.findById(eduId);

    if (!eduExists) {
      return res.status(404).json({ error: "Education history not found." });
    }

    await Education.findByIdAndDelete(eduId);
    userExists.educations = userExists.educations.filter(
      (edu) => edu.id !== eduId
    );

    await userExists.save();

    return res
      .status(200)
      .json({ message: "Education history deleted successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const deleteUserWork = async (req, res) => {
  const { id } = req.user;
  const body = req.body;
  const workId = req.params.workId;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const workExists = await Work.findById(workId);

    if (!workExists) {
      return res.status(404).json({ error: "Work history not found." });
    }

    await Work.findByIdAndDelete(workId);
    userExists.works = userExists.works.filter((work) => work.id !== workId);
    await userExists.save();

    return res
      .status(200)
      .json({ message: "Work history deleted successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const deleteUserDocuments = async (req, res) => {
  const { id } = req.user;
  const body = req.body;
  const docId = req.params.docId;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const docExists = await Document.findById(docId);

    if (!docExists) {
      return res.status(404).json({ error: "Document history not found." });
    }

    await Document.findByIdAndDelete(docId);
    userExists.document = userExists.documents.filter(
      (doc) => doc.id !== docId
    );
    await userExists.save();

    return res.status(200).json({ message: "Document  deleted successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports = {
  deleteUserEducation,
  deleteUserWork,
  deleteUserDocuments,
};
