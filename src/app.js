const express = require("express");
const app = express();
const { PORT } = require("./utils/config");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const authRoutes = require("./routes/authRoutes");
const { zwaggerOpsGetter } = require("./const ");
const requestLogger = require("./utils/middlewares/requestLogger");
const tokenExtractor = require("./utils/middlewares/tokenExtractor");
const userExtractor = require("./utils/middlewares/userExtractor");
const errorHandler = require("./utils/middlewares/errorHandler");

//routers
const userRouter = require("./routes/user/userRouter");
const companyRouter = require("./routes/company/router");
const JobRouter = require("./routes/job");

const options = zwaggerOpsGetter({ PORT });

const specs = swaggerJsdoc(options);

require("./db");

app.use(cors());
app.use(express.json());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(requestLogger);
app.get("/api", async (_req, res) => {
  return res.status(200).json({ message: "Welcome to Hive." });
});

app.use("/api/auth", authRoutes);

app.use(tokenExtractor);
app.use(userExtractor);

app.use("/api/users", userRouter);
app.use("/api/companies", companyRouter);
app.use("/api/jobs", JobRouter);

app.use(errorHandler);
module.exports = app;
