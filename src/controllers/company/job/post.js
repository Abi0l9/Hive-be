const Company = require("../../../models/Company");
const Job = require("../../../models/Company/Job");
const { User } = require("../../../models/User");

const addNewJob = async (req, res) => {
  const { id } = req.user;
  const body = req.body;

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

    body.company = userExists.company;

    const newJob = new Job(body);
    const savedJob = await newJob.save();

    companyExists.jobs = companyExists.jobs.concat(savedJob.id);
    await companyExists.save();

    return res.status(201).json({ message: "New Job Added Successfully." });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports = { addNewJob };
