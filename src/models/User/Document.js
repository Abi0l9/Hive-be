const { model, Schema } = require("mongoose");

const schema = new Schema({
  name: String,
  link: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  isCertificate: {
    type: Boolean,
    default: false,
  },
});

schema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Document = model("Document", schema);

module.exports = { Document };
