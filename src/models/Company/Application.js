const { model, Schema } = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const schema = new Schema({
  resume: String,
  coverLetter: String,
  portfolio: String,
  status: {
    type: String,
    default: "applied",
  },
  candidate: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "Job",
  },
  appliededAt: {
    type: Date,
    default: new Date(Date.now()).toLocaleString(),
  },
  updatedAt: {
    type: Date,
    default: new Date(Date.now()).toLocaleString(),
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

const Application = model("Application", schema);
module.exports = Application;
