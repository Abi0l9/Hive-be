const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const envPORT = require("./utils/config").PORT;

const PORT = envPORT || 4200;

server.listen(PORT, () => console.log("app running on port ", PORT));
