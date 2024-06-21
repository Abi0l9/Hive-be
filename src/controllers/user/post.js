const Application = require("../../models/Company/Application");
const Job = require("../../models/Company/Job");
const { User } = require("../../models/User");

const applyForJob = async (req, res) => {
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

    const newApplication = new Application({ ...body, candidate: id });
    const savedApplication = await newApplication.save();

    jobExists.applications = jobExists.applications.concat(savedApplication.id);
    userExists.jobs = userExists.jobs.concat(jobId);

    await jobExists.save();
    await userExists.save();

    return res.status(200).json({ message: "Applied to job, successfully." });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports = {
  applyForJob,
};
