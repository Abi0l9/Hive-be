const { model, Schema } = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const schema = new Schema({
  first_name: String,
  last_name: String,
  phone: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  dp: String,
  passwordHash: String,
  dob: String,
  marital_status: String,
  gender: String,
  origin: String,
  state: String,
  nationality: String,
  job_preference: String,
  verificationCode: String,
  forgotPwdCode: {
    default: "",
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  firstLogin: {
    type: Boolean,
    default: true,
  },
  roles: {
    enum: ["user", "recruiter", "admin"],
    type: [String],
    default: ["user"],
  },
  educations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Education",
      default: [],
    },
  ],
  works: [
    {
      type: Schema.Types.ObjectId,
      ref: "Work",
      default: [],
    },
  ],
  documents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Document",
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
  savedJobs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Job",
      default: [],
    },
  ],
  lastMode: {
    enum: ["user", "recruiter", "admin"],
    type: String,
    default: "user",
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
});

schema.plugin(mongooseUniqueValidator);

schema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject.passwordHash;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = model("User", schema);
module.exports = { User };
