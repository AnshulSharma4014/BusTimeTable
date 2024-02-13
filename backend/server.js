const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//Database connection
const uri =
	process.env.DB_URL ||
	`mongodb+srv://anshulsharma4014:s7EsiWPU1CMV6Wtr@bustimetable.c370sj3.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("Connection established succesfully");
});

//ROUTES
const timeTableViewRouter = require("./routes/timeTableView");
//const timeTableCreateRouter = require("./routes/timeTableCreate");

app.use("/view", timeTableViewRouter);
//app.use("/create-time-table", timeTableCreateRouter);

app.listen(PORT, () => {
	console.log("Listening on port: ", PORT);
});
