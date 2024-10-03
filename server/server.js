// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const app = express();

// // CORS configuration
// app.use(cors({
//   origin: ["https://deploy-mern-1whq.vercel.app"],
//   methods: ["POST", "GET"],
//   credentials: true
// }));

// app.use(express.json());

// // Database connection
// const MONGO_URL = 'mongodb+srv://krishanchhokar:Krishan$123@cluster001.jqcks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster001';
// mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB connection error:", err));

// // Routes
// const usersRoute = require("./routes/usersRoute");
// const examsRoute = require("./routes/examsRoute");
// const reportsRoute = require("./routes/reportsRoute");

// app.use("/api/users", usersRoute);
// app.use("/api/exams", examsRoute);
// app.use("/api/reports", reportsRoute);

// const port = process.env.PORT || 5000;

// const path = require("path");

// // Serve static assets in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client", "build")));
  
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

// // Start the server
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });





const express = require("express");
require("dotenv").config();
const cors = require('cors');
const app = express()
app.use(cors(
  {
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
  }
));

app.use(express.json());


// Database config
const dbConfig = require("./config/dbConfig");

// Routes
const usersRoute = require("./routes/usersRoute");
const examsRoute = require("./routes/examsRoute");
const reportsRoute = require("./routes/reportsRoute");

app.use("/api/users", usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", reportsRoute);

const port = process.env.PORT || 5000;

const path = require("path");

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
