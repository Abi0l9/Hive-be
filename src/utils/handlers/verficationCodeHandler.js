const verificationCodeHandler = () => {
  return Math.floor(Math.random() * 123456) + 123456;
};

module.exports = { verificationCodeHandler };
