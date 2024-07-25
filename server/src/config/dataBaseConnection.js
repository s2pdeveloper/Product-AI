const mongoose = require("mongoose");
const chalk = require("chalk");

let mongoUrl = "";
if (process.env.ENVIRONMENT === "development") {
  mongoose.set("autoCreate", true);
}
if (process.env.NODE_ENV == "production") {
  mongoUrl = process.env.MONGODB_URL;
}

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
 
});
mongoose.set("strictQuery", false);
mongoose.connection.on("connected", () => {
  console.log(chalk.green("✓"), "Mongoose connection establish successfully");
});

// If the connection throws an error
mongoose.connection.on("error", (error) => {
  console.log(chalk.red("X"), "Mongoose default connection error: ", error);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log(chalk.red("-X-"), "Mongoose default connection disconnected");
});