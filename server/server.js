require("dotenv").config();
const app = require("./src/app");
const config = require("./src/v1/config/index");

async function startServer() {
  try {
    const PORT = config.app.port;
    console.log(PORT);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.log("Cannot connect to the database !", error);
    process.exit();
  }
}
startServer();
