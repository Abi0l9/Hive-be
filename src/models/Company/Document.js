const { model, Schema } = require("mongoose");

const schema = new Schema({
  name: String,
  link: String,
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
});

schema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const CompanyDocument = model("CompanyDocument", schema);

module.exports = { CompanyDocument };
