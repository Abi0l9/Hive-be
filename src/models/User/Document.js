import { model, Schema } from "mongoose";

const schema = new Schema({
  name: String,
  link: String,
});

schema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Document = model("Document", schema);

export { Document };
