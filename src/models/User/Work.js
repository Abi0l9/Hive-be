const { model, Schema } = require("mongoose");

const schema = new Schema({
  company_name: String,
  industry: String,
  position: String,
  summary: String,
  start_date: String,
  end_date: String,
  current_job: {
    default: false,
    type: Boolean,
  },
});

schema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Work = model("Work", schema);

module.exports = { Work };
