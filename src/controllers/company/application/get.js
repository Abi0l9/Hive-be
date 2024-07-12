const Company = require("../../../models/Company");
const Application = require("../../../models/Company/Application");
const { User } = require("../../../models/User");

const getMyCompanyJobApplications = async (req, res) => {
  const { id } = req.user;

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

    const applications = await Application.find({
      company: companyExists.id,
    })
      .populate("job")
      .populate("candidate");

    return res.status(200).json(applications);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const getAnApplication = async (req, res) => {
  const { id } = req.user;
  const appId = req.params.appId;

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

    const application = await Application.findById(appId)
      .populate("job")
      .populate({
        path: "candidate",
        populate: [
          { path: "works" },
          { path: "educations" },
          { path: "documents" },
        ],
      });
    // .populate("candidate");

    return res.status(200).json(application);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports = {
  getMyCompanyJobApplications,
  getAnApplication,
};
