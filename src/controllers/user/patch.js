const { User } = require("../../models/User");
const bcrypt = require("bcrypt");
const { Education } = require("../../models/User/Education");
const { Work } = require("../../models/User/Work");
const { Document } = require("../../models/User/Document");
const Job = require("../../models/Company/Job");
const Company = require("../../models/Company");

const updatePersonalInfo = async (req, res) => {
  const { id } = req.user;
  const body = req.body;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    await User.findByIdAndUpdate(id, body);
    return res.status(200).json({ message: "User data updated successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const updateUserPassword = async (req, res) => {
  const { id } = req.user;
  const { old_password, new_password } = req.body;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordCorrect =
      (await bcrypt.compare(old_password, userExists.passwordHash)) || null;

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Old password is incorrect." });
    }

    const passwordHash = await bcrypt.hash(new_password, 10);

    await User.findByIdAndUpdate(id, { passwordHash });
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const updateUserEducation = async (req, res) => {
  const { id } = req.user;
  const body = req.body;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    //confirms if a previous record exists
    if (body.id) {
      const eduExists = await Education.findById(body.id);

      if (!eduExists) {
        return res.status(404).json({ error: "Education history not found." });
      }

      await Education.findByIdAndUpdate(body.id, body);

      return res
        .status(200)
        .json({ message: "Education history updated successfully" });
    }

    body.user = userExists.id;

    const newEdu = new Education(body);
    const savedEdu = await newEdu.save();

    userExists.educations = userExists.educations.concat(savedEdu.id);

    await userExists.save();

    return res.status(201).json({ message: "Education added successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const updateUserWork = async (req, res) => {
  const { id } = req.user;
  const body = req.body;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    if (body.id) {
      const workExists = await Work.findById(body.id);

      if (!workExists) {
        return res.status(404).json({ error: "Work history not found." });
      }

      await Work.findByIdAndUpdate(body.id, body);

      return res
        .status(200)
        .json({ message: "Work history updated successfully" });
    }

    body.user = userExists.id;

    const newWork = new Work(body);
    const savedWork = await newWork.save();

    userExists.works = userExists.works.concat(savedWork.id);

    await userExists.save();

    return res.status(201).json({ message: "Work history added successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const updateUserDocuments = async (req, res) => {
  const { id } = req.user;
  const body = req.body;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    if (body.id) {
      const docExists = await Document.findById(body.id);

      if (!docExists) {
        return res.status(404).json({ error: "Document history not found." });
      }

      await Document.findByIdAndUpdate(body.id, body);

      return res
        .status(200)
        .json({ message: "Document  updated successfully" });
    }

    body.user = userExists.id;

    const newDoc = new Document(body);
    const savedDoc = await newDoc.save();

    userExists.documents = userExists.documents.concat(savedDoc.id);

    await userExists.save();

    return res.status(201).json({ message: "Document added successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const switchUserMode = async (req, res) => {
  const { id } = req.user;
  const mode = req.params.mode;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    await User.findByIdAndUpdate(id, { lastMode: mode, firstLogin: false });

    return res.status(201).json({ message: "Switched successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const bookmarkAJob = async (req, res) => {
  const { id } = req.user;
  const body = req.body;
  const { jobId } = req.params;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const jobExists = await Job.findById(jobId);

    if (!jobExists) {
      return res.status(404).json({ error: "Job not found." });
    }

    const companyExists = await Company.findById(jobExists.company);

    if (!companyExists) {
      return res.status(404).json({ error: "Company not found." });
    }

    userExists.savedJobs = userExists.savedJobs.concat(jobId);

    await userExists.save();

    return res.status(200).json({ message: "Job bookmarked, successfully." });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports = {
  updatePersonalInfo,
  updateUserPassword,
  updateUserEducation,
  updateUserWork,
  updateUserDocuments,
  switchUserMode,
  bookmarkAJob,
};
