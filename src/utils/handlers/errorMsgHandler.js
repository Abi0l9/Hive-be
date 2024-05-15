const errorMsgHandler = (e) => {
  if (e instanceof Error) {
    return e.message;
  } else {
    return "An unexpected error occured...";
  }
};

module.exports = { errorMsgHandler };
