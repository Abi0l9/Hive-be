const { model, Schema } = require("mongoose");

const schema = new Schema({
  name: String,
  email: String,
  logo: String,
  phone: String,
  country: String,
  state: String,
  street: String,
  website: String,
  description: String,
  vision: String,
  services: String,
  mission: String,
  industry: String,
  employees: String,
  founded: String,
  linkedin: String,
  facebook: String,
  twitter: String,
  instagram: String,
  createdAt: {
    type: Date,
    default: new Date(Date.now()).toLocaleString(),
  },
  updatedAt: {
    type: Date,
    default: new Date(Date.now()).toLocaleString(),
  },
  recruiter: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  applications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Application",
      default: [],
    },
  ],
  jobs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Job",
      default: [],
    },
  ],
  documents: [
    {
      type: Schema.Types.ObjectId,
      ref: "CompanyDocument",
      default: [],
    },
  ],
});

const Company = model("Company", schema);
module.exports = Company;
