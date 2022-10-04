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
        block: {
            type : Number,
        }
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("projects", projectSchema);
