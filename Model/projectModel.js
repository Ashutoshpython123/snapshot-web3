const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
	{
		from: {
            type: String,
        },
        tokenId: {
            type: String,
        },
        to: {
            type: String,
        },
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("projects", projectSchema);
