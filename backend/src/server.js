const express = require("express");
const path = require("path");
const Config = require("./config");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoute");

const app = express();
const PORT = Config.PORT || 5000;

// Middleware to parse incoming JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Serve static files from the uploads folder inside src
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Updated to serve files from src/uploads

// dbConnection
mongoose.connect("mongodb://127.0.0.1:27017/ExpenseTracker")
  .then("Database Connected Successfull")
  .catch((error)=>console.error(error))
// api routes
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err, "server is not Connected");
  }
  console.log(`listening on port : http://localhost:${PORT}`);
});
