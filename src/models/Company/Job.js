const { model, Schema } = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const schema = new Schema({
  title: String,
  description: String,
  location: String,
  employmentType: String,
  category: String,
  salaryRange: String,
  benefits: String,
  requiredExperience: String,
  preferredExperience: String,
  educationRequirements: String,
  skillsRequired: String,
  level: String,
  applicationDeadline: Date,
  applicationInstructions: String,
  createdAt: {
    type: Date,
    default: new Date(Date.now()).toLocaleString(),
  },
  updatedAt: {
    type: Date,
    default: new Date(Date.now()).toLocaleString(),
  },
  requiredDocuments: String,
  applications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Application",
      default: [],
    },
  ],
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
});

schema.plugin(mongooseUniqueValidator);

schema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Job = model("Job", schema);
module.exports = Job;
