const { model, Schema } = require("mongoose");

const schema = new Schema({
  institution_name: String,
  course: String,
  degree: String,
  cgpa: String,
  classification: String,
  start_date: String,
  end_date: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

schema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Education = model("Education", schema);

module.exports = { Education };
