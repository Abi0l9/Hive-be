const mongoose = require("mongoose");
const { DB } = require("./utils/config");

mongoose
  .connect(DB)

  .then(() => console.log("db connected"))
  .catch((e) => console.error("error occured...", e.message));
