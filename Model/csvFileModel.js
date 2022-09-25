const mongoose = require("mongoose");

//Model for csv Details.
const csvFileSchema = mongoose.Schema(
	{
		ido_id: {
			type: String,
			required: true,
		},
		user_address: {
			type: String,
			required: true,
		},
		tier: {
			type: Number,
			required: true,
        }
	},
	{
		timestamps: true,
	},
);
//Exporting file and set collection name csv.
module.exports = mongoose.model("csvfile", csvFileSchema);