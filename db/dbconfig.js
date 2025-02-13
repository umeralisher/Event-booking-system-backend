require("dotenv").config();
const mongoose = require("mongoose");
const dBConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log(`Database connected sucessfully ${mongoose.connection.host}`);
    })
    .catch((err) => {
      console.log(`Database Connection Error! ${err}`);
    });
};
module.exports = dBConnect;
