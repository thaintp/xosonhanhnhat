const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Load env
dotenv.config({ path: "./process.env" });

const app = express();

// Dev logging
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

// Lazy load routes
app.use("/api/genDateStrings", require("./routes/genDateStrings.js"))
app.use("/api/result", require("./routes/result.js"));

// Choose port
const port = process.env.PORT || 7070;

// Listen
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
})
