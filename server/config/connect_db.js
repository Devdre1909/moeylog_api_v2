const mongoose = require("mongoose");
const chalk = require("chalk");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(
      chalk.green(
        `MongoDB connected: ${chalk.green.bold(
          connect.connection.host
        )} @ ${chalk.green.bold(new Date().toString())}`
      )
    );
  } catch (err) {
    console.log(chalk.red(err.message));
  }
};

module.exports = connectDB;
