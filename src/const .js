const zwaggerOpsGetter = ({ PORT }) => {
  return {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Hive Backend App",
        version: "0.1.0",
        description: "Hive APIs and endpoints documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Al-Khalifah",
          url: "https://github.com/Abi0l9",
          email: "oyedejimonsur@gmail.com",
        },
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
        },
      ],
    },
    apis: ["./routes/*.ts"],
  };
};

module.exports = { zwaggerOpsGetter };
