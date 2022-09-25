const mongoose = require("mongoose");

const contractEventSchema = mongoose.Schema(
	{
		contract_addr: {
			type: String,
			required: true,
		},
		user_address: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("contractEvents", contractEventSchema)