const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
	{
		owner: {
            type: String,
        },
        tokenId: {
            type: String,
        },
        eTokens: {
            type: String,
        }
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("projects", projectSchema);
