const { User } = require("../../models/User");
const { Education } = require("../../models/User/Education");
const { Work } = require("../../models/User/Work");
const { Document } = require("../../models/User/Document");
const Job = require("../../models/Company/Job");

const getOneUser = async (req, res) => {
  const { id } = req.user;
  const body = req.body;

  try {
    const userExists = await User.findById(id); //.populate("jobs");
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json(userExists);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const getUserEducation = async (req, res) => {
  const { id } = req.user;
  const body = req.body;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }
    const userEdu = await Education.find({ user: id });

    return res.status(200).json(userEdu);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const getUserWork = async (req, res) => {
  const { id } = req.user;
  const body = req.body;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const userWork = await Work.find({ user: id });

    return res.status(200).json(userWork);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const getUserDocs = async (req, res) => {
  const { id } = req.user;
  const body = req.body;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }
    const userDocs = await Document.find({ user: id });
    const docs = await Document.find({});

    return res.status(200).json(userDocs);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const getUserJobApplications = async (req, res) => {
  const { id } = req.user;
  const body = req.body;

  try {
    const userExists = await User.findById(id).populate("jobs");
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const jobs = userExists.jobs;

    return res.status(200).json(jobs);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const getUserBookmarkedJobs = async (req, res) => {
  const { id } = req.user;
  const body = req.body;

  try {
    const userExists = await User.findById(id).populate("savedJobs");
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const jobs = userExists.savedJobs;

    return res.status(200).json(jobs);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const getBestJobMatches = async (req, res) => {
  const { id } = req.user;
  const body = req.body;

  try {
    const userExists = await User.findById(id).populate("jobs");
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const jobs = await Job.find({});

    const locationMatch = jobs.filter((job) =>
      job.location
        .toLowerCase()
        .includes(userExists?.nationality?.toLowerCase())
    );

    const preferencesMatch = jobs.filter(
      (job) =>
        job.employmentType.toLowerCase() ===
        userExists.job_preference.toLowerCase()
    );

    if (preferencesMatch.length) {
      const uniqueData = new Map();
      const data = [...locationMatch, ...preferencesMatch];

      data.forEach((job) => {
        if (!uniqueData.has(job.id)) {
          uniqueData.set(job.id, job);
        }
      });

      const result = Array.from(uniqueData.values());

      return res.status(200).json(result);
    }

    return res.status(200).json([]);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports = {
  getOneUser,
  getUserEducation,
  getUserWork,
  getUserDocs,
  getUserJobApplications,
  getBestJobMatches,
  getUserBookmarkedJobs,
};
