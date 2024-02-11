const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const colors = require('colors')

app.use(cors({ origin: true }));
app.use(express.json());

// user authentication routes
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// Artist links
const artistsRoute = require("./routes/artists");
app.use("/api/artists/", artistsRoute);

// Album links
const albumRoute = require("./routes/albums");
app.use("/api/albums/", albumRoute);

// Songs links
const songRoute = require("./routes/songs");
app.use("/api/songs/", songRoute);

// If any depreciation warning add depreciation options
// mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true }, () => {
//   console.log("Mongodb Connected");
// });

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log("Listening to port number 4000".bgMagenta.white));

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected to Mongo Database".bgMagenta.white))
  .on("error", (error) => {
    console.log(`Error : ${error}`.bgRed.white);
  });

