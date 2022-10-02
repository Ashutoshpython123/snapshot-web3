require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
//const fs = require("fs");
const fileUpload = require("express-fileupload");


//App config
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(fileUpload());
app.use(cors());


app.use(
	"./frontend/build/exportcsv/",
	express.static(__dirname + "./frontend/build/exportcsv/"),
);
app.use("./temp/", express.static(__dirname + "./temp/"));

//routes

app.use("/api", require("./Routes/eventRoutes"));
// app.use("/api", require('./Routes/sfundRoutes'));
// app.use("/api", require('./Routes/votingPollsRoutes'));
mongoose.connect(
	process.env.CONNECTION_URL,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	},
	(err) => {
		if (err) throw err;
		console.log("connected to mongodb");
	},
);
//listener
if (process.env.NODE_ENV === "production") {
	app.use(express.static("frontend/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
	});
}

//listener
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`listening port localhost : ${port}`);
});


